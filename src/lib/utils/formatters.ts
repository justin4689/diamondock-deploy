export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    }).format(value);
  };
  
  export const calculateDiscountPercentage = (original: number, discounted: number) => {
    return Math.round(((original - discounted) / original) * 100);
  };