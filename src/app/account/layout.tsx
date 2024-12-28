"use client";

import React from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User2,
  ShoppingCart,
  Heart,
  Bell,
  Settings,
  CreditCard,
  LogOut,
  Store,
} from "lucide-react";

const menuItems = [
  { text: "Mon Profil", icon: <User2 />, path: "/account/profile" },
  { text: "Mes Commandes", icon: <ShoppingCart />, path: "/account/orders" },
  { text: "Ma Liste de Souhaits", icon: <Heart />, path: "/account/wishlist" },
  { text: "Mes Notifications", icon: <Bell />, path: "/account/notifications" },
  { text: "Ma Boutique", icon: <Store />, path: "/account/shop" },
  { text: "Mes Paiements", icon: <CreditCard />, path: "/account/payments" },
  { text: "Paramètres", icon: <Settings />, path: "/account/settings" },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        mt: {
          xs: 22,
          sm: 3,
        },
        mb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Menu latéral */}
          <Grid item xs={12} md={3}>
            <Paper elevation={1}>
              <List>
                {menuItems.map((item) => (
                  <Link
                    href={item.path}
                    key={item.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem
                      sx={{
                        backgroundColor:
                          pathname === item.path
                            ? "rgba(245, 124, 0, 0.8)"
                            : "transparent",
                        color: pathname === item.path ? "white" : "inherit",
                        "&:hover": {
                          backgroundColor:
                            pathname === item.path
                              ? "rgba(245, 124, 0, 0.9)"
                              : "rgba(245, 124, 0, 0.08)",
                        },
                        "&:focus-visible": {
                          backgroundColor:
                            pathname === item.path
                              ? "rgba(245, 124, 0, 0.9)"
                              : "rgba(245, 124, 0, 0.15)",
                          outline: "2px solid rgba(245, 124, 0, 0.6)",
                          outlineOffset: "-2px",
                        },
                        "& .MuiListItemIcon-root": {
                          color: pathname === item.path ? "white" : "inherit",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  </Link>
                ))}
                <Divider sx={{ my: 1 }} />
                <ListItem
                  component="button"
                  onClick={() => {
                    /* handle logout */
                  }}
                  sx={{
                    color: "red",
                    border: "none",
                    background: "none",
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "rgba(255, 0, 0, 0.04)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "red" }}>
                    <LogOut />
                  </ListItemIcon>
                  <ListItemText primary="Déconnexion" />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Contenu principal */}
          <Grid item xs={12} md={9}>
            <Paper elevation={1} sx={{ p: 3 }}>
              {children}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
