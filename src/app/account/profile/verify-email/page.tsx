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

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = localStorage.getItem("email"); // Récupérer l'email dans le localStorage
    try {
      const response = await fetch(`${apiUrl}/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ email, otp_code: otp }), // Envoi de l'email et du code OTP dans le corps de la requête
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la vérification de l'email.");
      }

      
      toast.success("Email vérifié avec succès");
      // Si la réponse est OK, rediriger vers la page d'accueil
      router.push("/account/profile"); // Redirection vers la page d'accueil après succès
    } catch (error: any) {
      toast.error(error.message || "Une erreur est survenue.");
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
        Vérifier l'email
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Code OTP"
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              color="warning"
              required
            />
          </Grid>
        </Grid>
        <Divider sx={{ marginY: 2 }} />
        <Button type="submit" variant="contained" sx={{ bgcolor: "#EF6C00" }}>
          Valider
        </Button>
      </form>
    </Box>
  );
}

export default VerifyEmail;
