"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import {
  Box,
  Paper,
  Grid,
  Pagination,
  Typography,
  Skeleton,
} from "@mui/material";
import FiltresSidebar from "@/components/products/FiltresSidebar";
import ProductCard from "@/components/products/ProductCard";
import MobileFilters from "@/components/products/MobileFilters";
import Link from "next/link";
import { Suspense } from "react";

interface DrawerStates {
  categories: boolean;
  brands: boolean;
  price: boolean;
  size: boolean;
}

interface Filters {
  selectedBrands: string[];
  priceRange: number[];
  selectedSizes: string[];
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: {
    image_url: string;
  };
  description?: string;
}

const ShopPage: React.FC = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [drawerStates, setDrawerStates] = useState<DrawerStates>({
    categories: false,
    brands: false,
    price: false,
    size: false,
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const toggleDrawer = (drawer: keyof DrawerStates) => {
    setDrawerStates((prev) => ({
      ...prev,
      [drawer]: !prev[drawer],
    }));
  };

  const [filters, setFilters] = useState<Filters>({
    selectedBrands: [],
    priceRange: [0, 500],
    selectedSizes: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categoriesRes, brandsRes, sizesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/categories`),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/brands`),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/sizes`),
        ]);

        if (!categoriesRes.ok || !brandsRes.ok || !sizesRes.ok) {
          throw new Error("Erreur lors du chargement des filtres");
        }

        const categoriesData = await categoriesRes.json();
        const brandsData = await brandsRes.json();
        const sizesData = await sizesRes.json();

        setCategories(categoriesData.categories);
        setBrands(brandsData.brands);
        setSizes(sizesData.sizes);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("page", currentPage.toString());
        if (searchQuery) queryParams.append("search", searchQuery);

        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/public/products?${queryParams.toString()}`,

          {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des produits");
        }

        const data = await response.json();

        setProducts(data.data);
        setTotalPages(data.pagination.last_page);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, searchQuery]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <Typography color="error">
          Erreur lors du chargement des produits
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Paper sx={{ width: 280, p: 2, display: { xs: "none", md: "block" } }}>
        {isLoading ? (
          <Skeleton variant="rectangular" width={260} height={500} />
        ) : (
          <FiltresSidebar filters={filters} setFilters={setFilters} />
        )}
      </Paper>

      <Box
        sx={{
          flex: 1,
          p: 3,
          mt: {
            xs: 22,
            sm: 3,
          },
        }}
      >
        <MobileFilters
          drawerStates={drawerStates}
          toggleDrawer={toggleDrawer}
          filters={filters}
          setFilters={setFilters}
          categories={categories}
          brands={brands}
          sizes={sizes}
        />
        <Grid container spacing={2}>
          {isLoading ? (
            [...Array(8)].map((_, index) => (
              <Grid item xs={6} sm={4} md={4} lg={3} key={index}>
                <Skeleton variant="rectangular" width="100%" height={400} />
              </Grid>
            ))
          ) : products.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
                Aucun produit disponible
              </Typography>
            </Grid>
          ) : (
            products.map((product) => (
              <Grid item xs={6} sm={4} md={4} lg={3} key={product.id}>
                <Link href={`/product/${product.id}`} passHref>
                  <div>
                    <ProductCard product={product} />
                  </div>
                </Link>
              </Grid>
            ))
          )}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          {isLoading ? (
            <Skeleton variant="text" width={100} height={50} />
          ) : (
            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ShopPage;
