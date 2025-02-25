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
  Skeleton,
} from "@mui/material";
import { UserProfile } from "@/types/User";
import { apiUrl } from "@/app/config/index";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Composant de squelette pour le chargement
const ProfileSkeleton = () => (
  <Box>
    <Skeleton variant="text" width={300} height={40} sx={{ mb: 4 }} />
    <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
      <Skeleton variant="circular" width={100} height={100} sx={{ mr: 3 }} />
    </Box>
    <Grid container spacing={3}>
      {[...Array(6)].map((_, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Skeleton variant="rectangular" height={56} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

type formValues = {
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  country: string;
  phone_number: string;
  zip_code: string;
};

export default function ProfilePage() {
  const [formValues, setFormValues] = useState<formValues | null>(null);
  const { data: session, status } = useSession();
  const [image, setImage] = useState<File | null>(null);
  const queryClient = useQueryClient();

  // Fonction utilitaire pour gérer l'URL de l'image
  const getImageUrl = (user: any) => {
    if (!user) return "/default-avatar.jpg";
    return user.image_url || "/default-avatar.jpg";
  };

  // Fetch user profile data
  const { data: userData, error: fetchError } = useQuery({
    queryKey: ["profile", session?.accessToken],
    queryFn: async () => {
      if (!session?.accessToken) throw new Error("Token manquant");

      const response = await fetch(`${apiUrl}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Erreur lors du chargement des données (Code: ${response.status})`
        );
      }

      const data = await response.json();

      if (!data.user) throw new Error("Données utilisateur non trouvées");

      setFormValues(data.user);
      return data.user;
    },
    enabled: !!session?.accessToken,
  });

  console.log("userData:", userData);

  // Update profile mutation
  const updateProfile = useMutation({
    mutationFn: async (formData: FormData) => {
      if (!session?.accessToken) {
        throw new Error("Token d'authentification manquant");
      }

      console.log("URL de l'API:", `${apiUrl}/auth/update-profile`);

      try {
        const response = await fetch(`${apiUrl}/auth/update-profile`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            Accept: "application/json",
          },
          body: formData,
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ error: "Erreur serveur" }));
          console.error("Erreur de réponse:", {
            status: response.status,
            statusText: response.statusText,
            error: errorData,
          });
          throw new Error(
            errorData.error ||
              `Erreur ${response.status}: ${response.statusText}`
          );
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Erreur lors de la mise à jour:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data.user) {
        queryClient.setQueryData(["profile", session?.accessToken], data.user);
        toast.success("Les données ont été mises à jour avec succès");
      }
    },
    onError: (error: Error) => {
      console.error("Erreur mutation:", error);
      toast.error(
        error.message || "Une erreur est survenue lors de la mise à jour"
      );
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValues) {
      toast.error("Aucune donnée à soumettre.");
      return;
    }

    if (!formValues.firstname || !formValues.lastname) {
      toast.error("Tous les champs obligatoires doivent être remplis.");
      return;
    }

    const formData = new FormData();

    // Ajouter _method=PUT pour émuler une requête PUT
    formData.append("_method", "PUT");

    // Ajout des champs textuels
    Object.entries({
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      address: formValues.address || "",
      city: formValues.city || "",
      country: formValues.country || "",
      phone_number: formValues.phone_number || "",
      zip_code: formValues.zip_code || "",
    }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (image) {
      formData.append("image", image);
    }

    // Debug: Afficher le contenu du FormData
    console.log("Contenu du FormData avant envoi :");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value instanceof File ? value.name : value);
    }

    try {
      await updateProfile.mutateAsync(formData);
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
    }
  };

  // Loading state
  if (status === "loading" || !formValues) {
    return <ProfileSkeleton />;
  }

  // Error state
  if (fetchError) {
    return (
      <Typography color="error" sx={{ p: 3 }}>
        {fetchError.message}
      </Typography>
    );
  }

  // No data state
  if (!userData) {
    return (
      <Typography sx={{ p: 3 }}>
        Aucune donnée utilisateur disponible.
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        INFORMATIONS PERSONNELLES
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Avatar
            sx={{ width: 150, height: 150, mr: 3 }}
            src={getImageUrl(userData)}
            alt={`${userData.firstname} ${userData.lastname}`}
          />
          <Typography variant="inherit" gutterBottom className="text-sm">
            {userData.firstname} {userData.lastname}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" gutterBottom>
            {userData.email}
          </Typography>
          <Link href="/account/profile/change-email">
            <Button
              size="small"
              variant="contained"
              sx={{
                mr: 1,
                bgcolor: "#F57C00",
                "&:hover": {
                  bgcolor: "#EF6C00",
                },
              }}
            >
              Changer l'email de connexion
            </Button>
          </Link>
          <Link href="/account/profile/change-password">
            <Button
              size="small"
              variant="contained"
              sx={{
                bgcolor: "#F57C00",
                "&:hover": {
                  bgcolor: "#EF6C00",
                },
              }}
            >
              Changer le mot de passe
            </Button>
          </Link>
        </Box>
      </Box>
      <Divider sx={{ mb: 4, mt: 4 }} />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Prénom"
              value={formValues.firstname || ""}
              onChange={(e) =>
                setFormValues({ ...formValues, firstname: e.target.value })
              }
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nom"
              value={formValues.lastname || ""}
              onChange={(e) =>
                setFormValues({ ...formValues, lastname: e.target.value })
              }
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PhoneInput
              country={"ci"} // Par défaut, France, mais tu peux le rendre dynamique
              value={formValues.phone_number || ""}
              onChange={(phone) =>
                setFormValues({ ...formValues, phone_number: phone })
              }
              inputStyle={{
                width: "100%",
                height: "56px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                paddingLeft: "50px",
                marginRight: "100px",
              }}
              buttonStyle={{
                borderRadius: "4px 0 0 4px",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Zip Code"
              name="zip_code"
              value={formValues.zip_code || ""}
              onChange={(e) =>
                setFormValues({ ...formValues, zip_code: e.target.value })
              }
              color="warning"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Adresse"
              value={formValues.address || ""}
              onChange={(e) =>
                setFormValues({ ...formValues, address: e.target.value })
              }
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Ville"
              value={formValues.city || ""}
              onChange={(e) =>
                setFormValues({ ...formValues, city: e.target.value })
              }
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Pays"
              select
              value={formValues.country || ""}
              onChange={(e) =>
                setFormValues({ ...formValues, country: e.target.value })
              }
              color="warning"
              SelectProps={{
                native: true,
              }}
            >
              <option value="CI">Côte d'Ivoire</option>
              <option value="FR">France</option>
              <option value="US">États-Unis</option>
              <option value="CA">Canada</option>
              {/* Ajoute ici les autres pays */}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Changer la photo de profil
            </Typography>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                if (file) {
                  setImage(file);
                  console.log("Fichier sélectionné :", file);
                }
              }}
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
