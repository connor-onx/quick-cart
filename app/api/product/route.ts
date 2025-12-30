import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {

  // Todo: Not sure if this route actually works, feel free to change
  const { searchParams } = new URL(request.url)
  const categoryId = searchParams.get('category-id')

  const filePath = path.join(
    process.cwd(),
    'public/data/products.json'
  )
  
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const products = JSON.parse(fileContents) as BackendProduct[]
  
  const result = categoryId
    ? products.filter((p: BackendProduct) => p.category_id === categoryId)
    : products

  return NextResponse.json(result ?? null)
}
