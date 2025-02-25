// services/productService.ts
export const fetchProductDetails = async (slug: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/products/${slug}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch product details: ${response.statusText}`);
      }
     const data = await response.json()

     const product = data.product


      return  product;
    } catch (error) {
      console.error(error);
      return null; // ou gère une valeur par défaut
    }
  };
  
  // services/productService.ts
export const fetchProduct = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/products?limit=8`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product details: ${response.statusText}`);
    }
   const data = await response.json()

   const product = data.product


    return  product;
  } catch (error) {
    console.error(error);
    return null; // ou gère une valeur par défaut
  }
};