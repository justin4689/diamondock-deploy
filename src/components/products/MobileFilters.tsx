import React from "react";
import {
  Drawer,
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { Category, FormatSize, Grading } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface DrawerStates {
  categories: boolean;
  brands: boolean;
  size: boolean;
}

interface Filters {
  selectedBrands: string[];
  priceRange: number[];
  selectedSizes: string[];
}

interface MobileFiltersProps {
  drawerStates: DrawerStates;
  toggleDrawer: (drawer: keyof DrawerStates) => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  categories: string[];
  brands: string[];
  sizes: string[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  drawerStates,
  toggleDrawer,
  filters,
  setFilters,
  categories,
  brands,
  sizes,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          mb: 2,
          gap: 1,
          overflowX: "auto",
          pb: 1,
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<Category />}
          onClick={() => toggleDrawer("categories")}
          size="small"
        >
          Catégories
        </Button>
        <Button
          variant="outlined"
          startIcon={<Grading />}
          onClick={() => toggleDrawer("brands")}
          size="small"
        >
          Marques
        </Button>
        <Button
          variant="outlined"
          startIcon={<FormatSize />}
          onClick={() => toggleDrawer("size")}
          size="small"
        >
          Taille
        </Button>
      </Box>

      <Drawer
        anchor="bottom"
        open={drawerStates.categories}
        onClose={() => toggleDrawer("categories")}
      >
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom variant="h6">
            Catégories
          </Typography>
          {categories.map((category: any) => {
            const isActive = pathname === `/category/${category.id}`;
            return (
              <Link
                href={`/category/${category.id}`}
                key={category.id}
                className={`block ${isActive ? "text-orange-500 bg-orange-500 font-bold hover:text-white hover:bg-orange-600" : ""}`}
              >
                {category.name}
              </Link>
            );
          })}
        </Box>
      </Drawer>

      <Drawer
        anchor="bottom"
        open={drawerStates.brands}
        onClose={() => toggleDrawer("brands")}
      >
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom variant="h6">
            Marques
          </Typography>
          <FormGroup>
            {brands.map((brand: any) => (
              <FormControlLabel
                key={brand.id}
                control={<Checkbox />}
                label={brand.name}
              />
            ))}
          </FormGroup>
        </Box>
      </Drawer>

      <Drawer
        anchor="bottom"
        open={drawerStates.size}
        onClose={() => toggleDrawer("size")}
      >
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom variant="h6">
            Taille
          </Typography>
          <FormGroup>
            {sizes.map((size: any) => (
              <FormControlLabel
                key={size.id}
                control={<Checkbox />}
                label={size.name}
              />
            ))}
          </FormGroup>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileFilters;
