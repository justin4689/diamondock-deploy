import { Card, Typography, Grid } from "@mui/material";
import Link from "next/link";
import Image from "next/image";



// const categories = [
//   {
//     name: "Electroniques",
//     image:
//       "https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Telephones",
//     image:
//       "https://images.unsplash.com/photo-1616410011236-7a42121dd981?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Montres",
//     image:
//       "https://images.unsplash.com/photo-1518393211950-fbf806ff383b?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Ecouteurs",
//     image:
//       "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Caméras",
//     image:
//       "https://plus.unsplash.com/premium_photo-1663134149019-284682ece04c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhfGVufDB8fDB8fHww",
//   },
//   {
//     name: "Jeux vidéo",
//     image:
//       "https://images.unsplash.com/photo-1595429035839-c99c298ffdde?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
// ];
export const fetchCategory = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/categories`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product details: ${response.statusText}`);
    }
   const data = await response.json()

   const categories = data.categories


    return  categories;
  } catch (error) {
    console.error(error);
    return null; // ou gère une valeur par défaut
  }
};

export default async function PopularCategories() {
  
 const categories = await fetchCategory()


  return (
    <section className="px-4 py-6">
      <h2 className="text-xl font-bold mb-6 text-center lg:text-4xl">
        Categories Populaires
      </h2>

      <div className="grid grid-cols-3 gap-3  lg:grid-cols-6">
        {categories.map((category:any) => (
          <Link 
            href={`/category/${category.id}`} 
            key={category.name}
            className="block"
          >
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-2">
              <div className="relative aspect-">
                <Image
                  src={category.image_url}
                  alt={category.name}
                  width={600}
                  height={600}
                  className="object-contain rounded-t-lg w-full h-full"
                />
              </div>
              <div className="p-2">
                <h3 className="text-sm text-center font-medium truncate">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}