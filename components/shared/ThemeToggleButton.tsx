import { Moon, Sun } from "lucide-react";

export default function ThemeToggleButton() {

  // Todo: Integrate with app

  const darkMode = false;

  return (
    <button
      // onClick={() => {}}
      className="p-6 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-gray-200 dark:border-gray-700"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun className="w-10 h-10 text-yellow-500" />
      ) : (
        <Moon className="w-10 h-10 text-blue-600" />
      )}
    </button>
  )
}
