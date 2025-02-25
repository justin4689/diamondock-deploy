export const fetchVendor = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/brands`);
      if (!response.ok) {
        throw new Error(`Failed to fetch product details: ${response.statusText}`);
      }
     const data = await response.json()

     const brands = data.brands


      return  brands;
    } catch (error) {
      console.error(error);
      return null; // ou gère une valeur par défaut
    }
  };
  