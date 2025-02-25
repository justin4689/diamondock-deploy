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
  
  export const fetchCategoryDetails = async (slug: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/categories/${slug}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch product details: ${response.statusText}`);
      }
     const data = await response.json()

     const category = data


      return  category;
    } catch (error) {
      console.error(error);
      return null; // ou gère une valeur par défaut
    }
  };
  
  export const fetchSubCategoryDetails = async (slug: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/sub-categories/${slug}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch product details: ${response.statusText}`);
      }
     const data = await response.json()

     const category = data


      return  category;
    } catch (error) {
      console.error(error);
      return null; // ou gère une valeur par défaut
    }
  };
  
  