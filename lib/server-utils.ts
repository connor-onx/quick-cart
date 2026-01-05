import fs from 'fs';
import path from 'path';

/**
 * Gets the category ID from a route segment by looking up in categories.json data
 * This is a server-side only function
 */
export function getCategoryIdFromRoute(routeSegment: string): string | null {
  try {
    const filePath = path.join(process.cwd(), 'public/data/categories.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const categoriesData = JSON.parse(fileContents) as Array<{ id: string; name: string }>;
    
    // Map route segment to category name (e.g., "pants" -> "pants", "t-shirts" -> "t-shirts")
    const categoryName = routeSegment.toLowerCase();
    const category = categoriesData.find(
      (cat) => cat.name.toLowerCase() === categoryName
    );
    return category?.id || null;
  } catch {
    return null;
  }
}

