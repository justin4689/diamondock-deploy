"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Paper,
  Button,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stepper,
  Step,
  StepLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import { ShoppingCart, Truck, CreditCard, Check } from "lucide-react";

const CheckoutPage: React.FC = () => {
  // États
  const [activeStep, setActiveStep] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Données simulées des articles du panier
  const cartItems = [
    {
      id: 1,
      name: "Chaussure de sport Nike",
      price: 150000,
      size: "42",
      quantity: 1,
      image:
        "https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg",
    },
    {
      id: 2,
      name: "T-shirt Adidas",
      price: 68000,
      size: "M",
      quantity: 1,
      image:
        "https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg",
    },
    {
      id: 3,
      name: "Montre connectée",
      price: 100000,
      size: "Unique",
      quantity: 1,
      image:
        "https://images.pexels.com/photos/1334600/pexels-photo-1334600.jpeg",
    },
  ];

  // Calcul automatique du total
  const cartSummary = {
    subtotal: cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
    shipping: 5000,
    discount: 0,
    get total() {
      return this.subtotal + this.shipping - this.discount;
    },
  };

  // Étapes du checkout
  const steps = ["Panier", "Livraison", "Paiement", "Confirmation"];

  // Gestion du coupon
  const handleApplyCoupon = () => {
    // Simulation de validation du coupon
    if (couponCode === "PROMO10") {
      cartSummary.discount = cartSummary.subtotal * 0.1;
      cartSummary.total =
        cartSummary.subtotal + cartSummary.shipping - cartSummary.discount;
    }
  };

  // Gestion de la commande
  const handleOrder = () => {
    // Simulation de création de commande
    const newOrderNumber = "CMD" + Math.floor(Math.random() * 1000000);
    setOrderNumber(newOrderNumber);
    setActiveStep(3);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {activeStep === 0 && (
            <Paper sx={{ p: 3, mb: 3 }}>
              {/* Contenu du panier */}
              <Typography variant="h6" gutterBottom>
                Récapitulatif du panier
              </Typography>
              {/* Liste des articles... */}
              <Box sx={{ mb: 3 }}>
                {cartItems.map((item) => (
                  <Box
                    key={item.id}
                    sx={{ display: "flex", mb: 2, alignItems: "center" }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                    <Box sx={{ ml: 2, flex: 1 }}>
                      <Typography variant="subtitle1">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Taille: {item.size} | Quantité: {item.quantity}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.price} CFA
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1">
                      {item.price * item.quantity} CFA
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Button
                variant="contained"
                onClick={() => setActiveStep(1)}
                sx={{ mt: 2, bgcolor: "#F57C00" }}
              >
                Continuer
              </Button>
            </Paper>
          )}

          {activeStep === 1 && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Informations de livraison
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    label="Nom et prénoms"
                    variant="outlined"
                    required
                  />
                </Grid>
               
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "center", gap: 2 }}
                >
                  <Box>
                  <Typography>Préfixe</Typography>
                    <Typography>+225</Typography>
                  </Box>

                  <TextField
                    fullWidth
                    label="Numéro de téléphone"
                    variant="outlined"
                    placeholder="07xxxxxxxx"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Adresse"
                    variant="outlined"
                    required
                    placeholder="Numéro et nom de rue"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Région"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Ville"
                    variant="outlined"
                    required
                  />
                </Grid>
               
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={saveAddress}
                        onChange={(e) => setSaveAddress(e.target.checked)}
                      />
                    }
                    label="Sauvegarder cette adresse pour mes prochaines commandes"
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                onClick={() => setActiveStep(2)}
                sx={{ mt: 2, bgcolor: "#F57C00" }}
              >
                Continuer vers le paiement
              </Button>
            </Paper>
          )}

          {activeStep === 2 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Mode de paiement
              </Typography>
              <RadioGroup defaultValue="card">
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="Carte bancaire"
                />
                <FormControlLabel
                  value="mobile"
                  control={<Radio />}
                  label="Mobile Money"
                />
                <FormControlLabel
                  value="delivery"
                  control={<Radio />}
                  label="Paiement à la livraison"
                />
              </RadioGroup>
              <Button
                variant="contained"
                onClick={handleOrder}
                sx={{ mt: 2, bgcolor: "#F57C00" }}
              >
                Confirmer la commande
              </Button>
            </Paper>
          )}

          {activeStep === 3 && (
            <Paper sx={{ p: 3 }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                Votre commande a été confirmée !
              </Alert>
              <Typography variant="h6" gutterBottom>
                Numéro de commande: {orderNumber}
              </Typography>
              <Typography variant="body1" paragraph>
                Vous recevrez un email de confirmation avec les détails de votre
                commande.
              </Typography>
              <Typography variant="h6" gutterBottom>
                Suivi de commande
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Stepper orientation="vertical">
                  <Step active>
                    <StepLabel>Commande confirmée</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>En cours de préparation</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>En cours de livraison</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Livrée</StepLabel>
                  </Step>
                </Stepper>
              </Box>
            </Paper>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Résumé de la commande
            </Typography>

            {/* Section coupon */}
            <Box sx={{ my: 2 }}>
              <TextField
                size="small"
                label="Code promo"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                sx={{ mr: 1, color: "#F57C00" }}
              />
              <Button
                variant="outlined"
                onClick={handleApplyCoupon}
                sx={{
                  color: "#F57C00",
                  borderColor: "#F57C00",
                  mt: { xs: 0, md: 1 },
                }}
              >
                Appliquer
              </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Résumé des coûts */}
            <Box sx={{ my: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Sous-total</Typography>
                <Typography>{cartSummary.subtotal} CFA</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Frais de livraison</Typography>
                <Typography>{cartSummary.shipping} CFA</Typography>
              </Box>
              {cartSummary.discount > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography color="error">Réduction</Typography>
                  <Typography color="error">
                    -{cartSummary.discount} CFA
                  </Typography>
                </Box>
              )}
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">{cartSummary.total} CFA</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutPage;
