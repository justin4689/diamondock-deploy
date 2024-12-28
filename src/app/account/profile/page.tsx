"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  TextField,
  Button,
  Divider,
} from "@mui/material";

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+225 0123456789",
    address: "123 Rue du Commerce",
    city: "Abidjan",
    country: "Côte d'Ivoire",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de mise à jour du profil
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Avatar
          sx={{ width: 100, height: 100, mr: 3 }}
          src="/path-to-avatar.jpg"
        />
        <Box>
          <Typography variant="h5" gutterBottom>
            {userData.firstName} {userData.lastName}
          </Typography>
          <Button variant="outlined" size="small">
            Changer la photo
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Prénom"
              value={userData.firstName}
              onChange={(e) =>
                setUserData({ ...userData, firstName: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nom"
              value={userData.lastName}
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Téléphone"
              value={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Adresse"
              value={userData.address}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Ville"
              value={userData.city}
              onChange={(e) =>
                setUserData({ ...userData, city: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Pays"
              value={userData.country}
              onChange={(e) =>
                setUserData({ ...userData, country: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                bgcolor: "#F57C00",
                "&:hover": {
                  bgcolor: "#EF6C00",
                },
              }}
            >
              Sauvegarder les modifications
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
