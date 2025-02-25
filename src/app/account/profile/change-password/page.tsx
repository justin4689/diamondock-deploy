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
import { toast } from "sonner";
import { useSession } from "next-auth/react";
function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Pour gérer l'état de chargement
  const [error, setError] = useState<string | null>(null); // Pour afficher les erreurs
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Vérification que le nouveau mot de passe et la confirmation correspondent
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Vérification que les champs ne sont pas vides
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setIsLoading(true); // Activer l'état de chargement
    setError(null); // Réinitialiser les erreurs

    try {
      const response = await fetch(`${apiUrl}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
         
        }), // Envoi des données de changement de mot de passe
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Mot de passe actuel invalide.");

      }

      toast.success("mot de passe modifié avec succès");
      // Si la réponse est OK, rediriger vers la page d'accueil ou de connexion
      router.push("/account/profile"); // Redirection vers la page de login après succès
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
        Changer le mot de passe
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mot de passe actuel"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              color="warning"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nouveau mot de passe"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              color="warning"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Confirmer le nouveau mot de passe"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ChangePassword;
