import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const filePath = path.join(process.cwd(), 'public/data/products.json')
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'products file not found' }, { status: 500 });
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const products = JSON.parse(fileContents) as BackendProduct[];
  const product = products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const catFilePath = path.join(process.cwd(), 'public/data/categories.json');
  if (!fs.existsSync(catFilePath)) {
    return NextResponse.json({ error: 'categories file not found' }, { status: 500 });
  }

  const catFileContents = fs.readFileSync(catFilePath, 'utf8');
  const categories = JSON.parse(catFileContents) as BackendProduct[];
  const category = categories.find((cat) => cat.id === product.category_id)?.name || "Unknown";

  const relatedProducts: ProductMinimal[] =
    (product.relatedProducts ?? [])
      .map((relatedProductId) =>
        products.find(p => p.id === relatedProductId)
      )
      .filter((p): p is BackendProduct => Boolean(p))
      .map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        images: p.images,
        category: categories.find((cat) => cat.id === p.category_id)?.name || "Unknown"
      }));

  return NextResponse.json({
    ...product,
    category,
    relatedProducts
  });
}
