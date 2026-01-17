"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";

export default function ThemeToggleButton() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-6 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-gray-200 dark:border-gray-700"
      aria-label="Toggle dark mode"
      aria-pressed={darkMode}
    >
      {darkMode ? (
        <Sun className="w-10 h-10 text-yellow-500" />
      ) : (
        <Moon className="w-10 h-10 text-blue-600" />
      )}
    </button>
  )
}
