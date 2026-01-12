interface PageHeaderProps {
  categoryName: string;
}

export default function PageHeader({ categoryName }: PageHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-5xl mb-2">
        {categoryName}
      </h1>
      <p className="text-xl mb-8">
        Tap an item to view details.
      </p>
    </div>
  );
}

