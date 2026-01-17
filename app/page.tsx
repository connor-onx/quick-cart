import CatCard from "@/components/home/Card";
import ShoppingCartButton from "@/components/shared/ShoppingCartButton";
import ThemeToggleButton from "@/components/shared/ThemeToggleButton";
import { categories } from "@/lib/constants"

export default function HomePage() {
  return (
    <main className="relative p-8 min-h-full max-w-[1080px] mx-auto bg-gradient-to-b from-white to-white dark:from-gray-800 dark:to-gray-900">
      <h1 className="text-center text-5xl mb-2">CBTS Fashion</h1>
      <p className="text-center text-xl mb-8"> Choose a category to get started</p>
      <ul className="grid grid-cols-[max-content_max-content] justify-center gap-6">
        {categories.map((category) => (
          <CatCard key={category.name} category={category}/>
        ))}
      </ul>
      <div className="absolute top-8 right-8 flex gap-4">
        <ThemeToggleButton/>
        <ShoppingCartButton/>
      </div>
    </main>
  )
}
