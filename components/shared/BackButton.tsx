import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  className?: string;
}

export default function BackButton({ className }: BackButtonProps) {

  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className={`flex items-center bg-transparent gap-4 text-3xl text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors active:scale-95 ${className}`}
    >
      <ArrowLeft className="w-10 h-10"/>
      Back
    </Button>
  )
}
