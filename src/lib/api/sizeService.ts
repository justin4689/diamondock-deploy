export const fetchSize = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/sizes`);
      if (!response.ok) {
        throw new Error(`Failed to fetch product details: ${response.statusText}`);
      }
     const data = await response.json()

     const sizes = data.sizes


      return  sizes;
    } catch (error) {
      console.error(error);
      return null; // ou gère une valeur par défaut
    }
  };
  