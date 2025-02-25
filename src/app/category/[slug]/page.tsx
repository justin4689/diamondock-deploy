import { fetchCategoryDetails } from "@/lib/api/categoryService";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = params;
  const { category } = await fetchCategoryDetails(slug);


  return (
    <div className="container mx-auto px-4 py-8 mt-36 lg:mt-0">
      {/* Category Header */}
      <div className="relative h-64 w-full mb-8 rounded-lg overflow-hidden">
        <Image
          src={category?.image_url}
          alt={category?.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className=" text-xl md:text-4xl font-bold text-white">{category?.name}</h1>
        </div>
      </div>

      {/* Subcategories */}
      {category.sub_categorys.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Sous-catégories</h2>
          <div className="flex gap-4 flex-wrap">
            {category.sub_categorys.map((subCategory:any) => (
              <Link
                key={subCategory.id}
                href={`/subcategory/${subCategory?.id}`}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition"
              >
                {subCategory.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {category.products.map((product:any) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <div>
            <ProductCard product={product} /> 
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
