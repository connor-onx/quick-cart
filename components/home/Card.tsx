import Link from "next/link";
import { Card, CardTitle } from "../ui/card";

interface CatCardProps {
  category: CatCard;
}

export default function CatCard({ category }: CatCardProps) {
  return (
    <Card
      className="relative p-0 w-[500px] h-[348px] cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-blue-500"
      style={{
        backgroundImage: `url(${category.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Link className="w-full h-full" href={category.link}>
        <CardTitle className="absolute top-1/2 -translate-y-1/2 z-10 w-full text-4xl text-white text-center drop-shadow-lg">{category.name}</CardTitle>
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 rounded-lg"/>
      </Link>
    </Card>
  )
}
