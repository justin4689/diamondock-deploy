// services/shopService.ts
export const fetchShopDetails = async (slug: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/vendor/show/${slug}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch shop details: ${response.statusText}`);
    }
    const data = await response.json();
    return data.vendor;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchShop = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/index`);
    if (!response.ok) {
      throw new Error(`Failed to fetch shops: ${response.statusText}`);
    }
    const data = await response.json();
    return data.vendors;
  } catch (error) {
    console.error(error);
    return [];
  }
};