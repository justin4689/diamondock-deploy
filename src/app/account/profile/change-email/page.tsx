"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
import { apiUrl } from "@/app/config/index";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

function ChangeEmail() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Pour gérer l'état de chargement
  const [error, setError] = useState<string | null>(null); // Pour afficher les erreurs
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Logique de soumission ici
    setIsLoading(true); // Activer l'état de chargement
    setError(null); // Réinitialiser les erreurs

    try {
      const response = await fetch(`${apiUrl}/auth/change-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ email: email}), // Envoi de l'email dans le corps de la requête
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'email.");
      }

      localStorage.setItem("email", email);
      toast.success("un code OTP a été envoyé avec succès");
      // Si la réponse est OK, rediriger vers la page de vérification de l'email
      router.push("/verify-email");
    } catch (error: any) {
    toast.error(error.message || "Une erreur est survenue.");
    } finally {
      setIsLoading(false); // Désactiver l'état de chargement
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        <Button
          variant="outlined"
          onClick={() => router.back()}
          color="warning"
          sx={{
            mr: 2,
            mb: 1,
          }}
        >
          <IoArrowBackOutline />
        </Button>
        Changer l'email
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              color="warning"
              required
            />
          </Grid>
        </Grid>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Divider sx={{ marginY: 2 }} />
        <Button
          type="submit"
          variant="contained"
          sx={{ bgcolor: "#EF6C00" }}
          disabled={isLoading} // Désactiver le bouton pendant le chargement
        >
          {isLoading ? "Chargement..." : "Valider"}
        </Button>
      </form>
    </Box>
  );
}

export default ChangeEmail;
