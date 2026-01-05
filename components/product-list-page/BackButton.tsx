import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  return (
    <Link href="/">
      <Button
        variant="ghost"
        className="text-gray-700 hover:text-gray-900 hover:bg-transparent p-0 h-auto font-normal"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        <span>Back</span>
      </Button>
    </Link>
  );
}

