import CatCard from "@/components/home/Card";
import ShoppingCartButton from "@/components/shared/ShoppingCartButton";
import ThemeToggleButton from "@/components/shared/ThemeToggleButton";
import { categories } from "@/lib/constants"

export default function HomePage() {
  return (
    <main className="relative p-6 min-h-full">
      <h1 className="text-center text-5xl mb-2">CBTS Fashion</h1>
      <p className="text-center text-xl mb-8"> Choose a category to get started</p>
      <ul className="grid grid-cols-[max-content_max-content] justify-center gap-6">
        {categories.map((category) => (
          <CatCard key={category.name} category={category}/>
        ))}
      </ul>
      <div className="absolute top-4 right-4 flex gap-4">
        <ThemeToggleButton/>
        <ShoppingCartButton/>
      </div>
    </main>
  )
}
