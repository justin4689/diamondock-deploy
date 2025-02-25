import React from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";
import { fetchCategory } from "@/lib/api/categoryService";
import { fetchBrand } from "@/lib/api/brandService";
import { fetchSize } from "@/lib/api/sizeService";
import { useRouter } from "next/navigation";
import Link from "next/link";

const categories = await fetchCategory();
const brands = await fetchBrand();
const sizes = await fetchSize();

interface FiltresSidebarProps {
  filters: {
    selectedBrands: string[];
    priceRange: number[];
    selectedSizes: string[];
  };
  setFilters: (filters: any) => void;
}

const FiltresSidebar: React.FC<FiltresSidebarProps> = ({
  filters,
  setFilters,
}) => {
  const [selectedBrand, setSelectedBrand] = React.useState<string | null>(null);
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    handleFilterChange("brand", brand);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    handleFilterChange("size", size);
  };

  const router = useRouter();
  const handleFilterChange = (
    type: "brand" | "size",
    value: string,
    checked?: boolean
  ) => {
    let searchParams = new URLSearchParams(window.location.search);

    if (checked) {
      searchParams.set("search", value);
    } else {
      searchParams.delete("search");
    }

    router.push(`/shop?${searchParams.toString()}`);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <FilterList />
        <Typography sx={{ ml: 1 }}>Filtres</Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Catégories</Typography>

        <Box sx={{ mt: 2, ml: 2, mr: 3 }}>
          {categories.map((category:any) => (
            <Link key={category.id} href={`/category/${category.id}`}>
              <Box
                sx={{
                  display: "block",
                  mb: 1,
                  cursor: "pointer",
                  color: "text.secondary",
                  transition: "color 0.2s, font-weight 0.2s",
                  "&:hover": {
                    color: "primary.main",
                    fontWeight: "bold",
                  },
                }}
              >
                {category.name}
              </Box>
            </Link>
          ))}
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Marques</Typography>
        <Box sx={{ mt: 2, ml: 2, mr: 3 }}>
          <FormGroup>
            {brands.map((brand:any) => (
              <FormControlLabel
                key={brand.id}
                control={
                  <Checkbox
                    checked={selectedBrand === brand.name}
                    onChange={(e) => {
                      const newValue = e.target.checked ? brand.name : null;
                      setSelectedBrand(newValue);
                      handleFilterChange("brand", brand.name, e.target.checked);
                    }}
                  />
                }
                label={brand.name}
              />
            ))}
          </FormGroup>
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Taille</Typography>
        <Box sx={{ mt: 2, ml: 2, mr: 3 }}>
          <FormGroup>
            {sizes.map((size:any) => (
              <FormControlLabel
                key={size.id}
                control={
                  <Checkbox
                    checked={selectedSize === size.name}
                    onChange={(e) => {
                      const newValue = e.target.checked ? size.name : null;
                      setSelectedSize(newValue);
                      handleFilterChange("size", size.name, e.target.checked);
                    }}
                  />
                }
                label={size.name}
              />
            ))}
          </FormGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default FiltresSidebar;
