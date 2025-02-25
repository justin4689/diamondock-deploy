"use client";

import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createOrder, createPaymentIntent } from "@/services/api";
import stripePromise from "@/lib/stripe";
import { Elements } from "@stripe/react-stripe-js";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useSession } from "next-auth/react";

interface DeliveryInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  additionalInfo?: string;
}

interface PaymentInfo {
  method: "card" | "mobile-money" | "cash";
  mobileNumber?: string;
}

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { items, getTotal, getShippingCost, clearCart } = useCartStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [orderNumber, setOrderNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    additionalInfo: "",
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: "card",
    mobileNumber: "",
  });

  const handlePaymentSuccess = (orderNumber: string) => {
    setOrderNumber(orderNumber);
    clearCart();
    setActiveStep(3);
    setIsProcessing(false);
  };

  const handlePaymentError = (errorMessage: string) => {
    setError("Une erreur est survenue : " + errorMessage);
    setIsProcessing(false);
  };

  const steps = ["Panier", "Livraison", "Paiement", "Confirmation"];
  const subtotal = getTotal();
  const shippingCost = getShippingCost();
  const total = subtotal + shippingCost - couponDiscount;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "PROMO10") {
      const discount = subtotal * 0.1;
      setCouponDiscount(discount);
      setError(null);
    } else {
      setError("Code promo invalide");
    }
  };

  const validateDeliveryInfo = (): boolean => {
    if (
      !deliveryInfo.fullName ||
      !deliveryInfo.email ||
      !deliveryInfo.phone ||
      !deliveryInfo.address ||
      !deliveryInfo.city
    ) {
      setError("Veuillez remplir tous les champs obligatoires");
      return false;
    }
    if (!deliveryInfo.email.includes("@")) {
      setError("Email invalide");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError(null);
    if (activeStep === 0 && items.length === 0) {
      setError("Votre panier est vide");
      return;
    }
    if (activeStep === 1 && !validateDeliveryInfo()) {
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // Hydratation du store
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isHydrated) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const CheckoutForm = ({
    onSuccess,
    onError,
    isProcessing,
    deliveryInfo,
    items,
    total,
  }: any) => {
    const stripe = useStripe();
    const elements = useElements();
    const { data: session } = useSession();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!session?.accessToken) {
        onError("Vous devez être connecté pour effectuer un paiement");
        return;
      }

      try {
        // 1. Créer la commande
        const orderData = {
          products: items.map((item: any) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        };

        const orderResponse = await createOrder(orderData, session.accessToken);
        const orderNumber = orderResponse.order.tracking_number;

        // 2. Créer le PaymentIntent côté backend
        const paymentIntentResponse = await createPaymentIntent(
          { order_id: orderResponse.order.id },
          session.accessToken
        );

        const { clientSecret } = paymentIntentResponse;

        if (!stripe || !elements) {
          throw new Error("Stripe n'a pas été initialisé correctement.");
        }

        // 3. Confirmer le paiement avec Stripe
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: elements.getElement(CardElement)!,
            },
          }
        );

        if (error) {
          throw new Error(error.message || "Le paiement a échoué.");
        }

        if (paymentIntent.status === "succeeded") {
          onSuccess(orderNumber);
        } else {
          throw new Error("Le paiement n'a pas abouti.");
        }
      } catch (error: any) {
        onError(error.message || "Une erreur est survenue lors du paiement.");
      }
    };

    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Mode de paiement
        </Typography>

        <RadioGroup
          value={paymentInfo.method}
          onChange={(e) =>
            setPaymentInfo({
              ...paymentInfo,
              method: e.target.value as PaymentInfo["method"],
            })
          }
        >
          <FormControlLabel
            value="card"
            control={<Radio />}
            label="Carte bancaire"
          />
          <FormControlLabel
            value="mobile-money"
            control={<Radio />}
            label="Mobile Money"
          />
          <FormControlLabel
            value="cash"
            control={<Radio />}
            label="Paiement à la livraison"
          />
        </RadioGroup>

        <Box sx={{ mt: 2 }}>
          {paymentInfo.method === "card" && (
            <Box sx={{ mt: 2 }}>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                  hidePostalCode: true,
                }}
              />
            </Box>
          )}

          {paymentInfo.method === "mobile-money" && (
            <TextField
              fullWidth
              label="Numéro de téléphone"
              value={paymentInfo.mobileNumber}
              onChange={(e) =>
                setPaymentInfo({ ...paymentInfo, mobileNumber: e.target.value })
              }
              sx={{ mt: 2 }}
            />
          )}

          {paymentInfo.method === "cash" && (
            <Typography color="text.secondary" sx={{ mt: 2 }}>
              Vous paierez à la livraison
            </Typography>
          )}

          <Button
            type="submit"
            disabled={isProcessing || !stripe}
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            {isProcessing ? "Traitement..." : "Confirmer la commande"}
          </Button>
        </Box>
      </Paper>
    );
  };
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        maxWidth: 1200,
        mx: "auto",
        mt: { xs: 22, sm: 3 },
      }}
    >
      <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {/* Étape 0: Panier */}
          {activeStep === 0 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Récapitulatif du panier
              </Typography>
              {items.map((item) => (
                <Box
                  key={item.id}
                  sx={{ display: "flex", mb: 2, alignItems: "center" }}
                >
                  <Image
                    src={item.image?.image_url || "/placeholder-image.png"}
                    alt={item.name || "Product image"}
                    width={80}
                    height={80}
                    style={{ objectFit: "cover", borderRadius: 8 }}
                  />
                  <Box sx={{ ml: 2, flex: 1 }}>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.size && `Taille: ${item.size}`}{" "}
                      {item.color && `| Couleur: ${item.color}`}
                    </Typography>
                    <Typography variant="body2">
                      Quantité: {item.quantity} × {formatPrice(item.price)}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle1">
                    {formatPrice(item.price * item.quantity)}
                  </Typography>
                </Box>
              ))}
            </Paper>
          )}

          {/* Étape 1: Livraison */}
          {activeStep === 1 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Informations de livraison
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nom et prénoms"
                    value={deliveryInfo.fullName}
                    onChange={(e) =>
                      setDeliveryInfo({
                        ...deliveryInfo,
                        fullName: e.target.value,
                      })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={deliveryInfo.email}
                    onChange={(e) =>
                      setDeliveryInfo({
                        ...deliveryInfo,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Téléphone"
                    value={deliveryInfo.phone}
                    onChange={(e) =>
                      setDeliveryInfo({
                        ...deliveryInfo,
                        phone: e.target.value,
                      })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Adresse"
                    value={deliveryInfo.address}
                    onChange={(e) =>
                      setDeliveryInfo({
                        ...deliveryInfo,
                        address: e.target.value,
                      })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ville"
                    value={deliveryInfo.city}
                    onChange={(e) =>
                      setDeliveryInfo({ ...deliveryInfo, city: e.target.value })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Instructions supplémentaires"
                    multiline
                    rows={2}
                    value={deliveryInfo.additionalInfo}
                    onChange={(e) =>
                      setDeliveryInfo({
                        ...deliveryInfo,
                        additionalInfo: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* Étape 2: Paiement */}
          {activeStep === 2 && (
            <Elements stripe={stripePromise}>
              <CheckoutForm
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                isProcessing={isProcessing}
                deliveryInfo={deliveryInfo}
                items={items}
                total={total}
              />
            </Elements>
          )}

          {/* Étape 3: Confirmation */}
          {activeStep === 3 && (
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5" gutterBottom>
                Commande confirmée !
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Numéro de commande: {orderNumber}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Merci pour votre commande. Vous recevrez un email de
                confirmation avec les détails de votre commande.
              </Typography>
              <Button
                variant="contained"
                onClick={() => router.push("/shop")}
                sx={{ bgcolor: "#EF6C00" }}
              >
                Continuer mes achats
              </Button>
            </Paper>
          )}

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            {activeStep > 0 && activeStep < 3 && (
              <Button onClick={handleBack}>Retour</Button>
            )}
            {activeStep < 2 && (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ bgcolor: "#EF6C00" }}
              >
                Continuer
              </Button>
            )}
          </Box>
        </Grid>

        {/* Résumé de la commande */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: "sticky", top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Résumé de la commande
            </Typography>
            <Box sx={{ my: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Sous-total</Typography>
                <Typography>{formatPrice(subtotal)}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Livraison</Typography>
                <Typography>{formatPrice(shippingCost)}</Typography>
              </Box>
              {couponDiscount > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>Réduction</Typography>
                  <Typography color="error">
                    -{formatPrice(couponDiscount)}
                  </Typography>
                </Box>
              )}
              <Divider sx={{ my: 1 }} />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">{formatPrice(total)}</Typography>
              </Box>
            </Box>

            {activeStep < 3 && (
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Code promo"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleApplyCoupon}
                  sx={{ color: "#EF6C00", borderColor: "#EF6C00" }}
                >
                  Appliquer
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutPage;
