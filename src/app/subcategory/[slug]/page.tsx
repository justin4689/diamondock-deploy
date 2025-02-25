import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from "@/lib/utils";
import { fetchSubCategoryDetails } from '@/lib/api/categoryService';
import ProductCard from '@/components/products/ProductCard';






export default async function SubCategoryPage({ params }: { params: { slug: string } }) {
  const { subCategory } = await fetchSubCategoryDetails(params.slug);
  console.log(subCategory.products);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{subCategory.name}</h1>
        <p className="text-gray-600">Category: {subCategory.category.name}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {subCategory.category.products.map((product:any) => (
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
