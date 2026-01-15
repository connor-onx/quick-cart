type BackendProduct = {
  id: string,
  name: string,
  description: string,
  price: number,
  sizes: ProductSize[],
  images: string[],
  category_id: string,
  brand_id: string,
  status: string,
  relatedProducts: string[],
  created_at: string,
  updated_at: string
}

type Product = {
  id: string,
  name: string,
  description: string,
  price: number,
  sizes: ProductSize[],
  images: string[],
  category: string,
  brand: string,
  status: string,
  relatedProducts: ProductMinimal[],
  modelPath: string,
  created_at: string,
  updated_at: string
}

type ProductMinimal = {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
}

type ProductSize = "XS" | "S" | "M" | "L" | "XL";

type TimeFilter = "today" | "this-week" | "this-month" | "this-year";

type CartItem = {
  product: Product;
  size: ProductSize;
  quantity: number;
}
