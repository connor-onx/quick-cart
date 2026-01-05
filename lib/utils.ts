import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { categories } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// get the category name form the route (pants -> Pants)
export function getCategoryNameFromRoute(routeSegment: string): string {
  const category = categories.find(
    (cat) => cat.link === `/${routeSegment}`
  );
  return category?.name || routeSegment.charAt(0).toUpperCase() + routeSegment.slice(1);
}
