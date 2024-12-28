"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { CreditCard, Plus, Trash2 } from "lucide-react";

interface PaymentMethod {
  id: string;
  type: "card";
  last4: string;
  expiry: string;
  brand: string;
  isDefault: boolean;
}

interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  description: string;
}

export default function PaymentsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      last4: "4242",
      expiry: "12/24",
      brand: "visa",
      isDefault: true,
    },
    // Ajoutez d'autres méthodes de paiement...
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "TRX-001",
      date: "2024-02-20",
      amount: 150000,
      status: "completed",
      description: "Achat #ORD-001",
    },
    // Ajoutez d'autres transactions...
  ]);

  const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
  const [newCardForm, setNewCardForm] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const handleAddCard = () => {
    // Logique d'ajout de carte
    setOpenNewCardDialog(false);
  };

  const handleDeleteCard = (cardId: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== cardId));
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <CreditCard size={24} className="mr-2" />
        <Typography variant="h5">Mes Paiements</Typography>
      </Box>

      {/* Méthodes de paiement */}
      <Box sx={{ mb: 6 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6">Méthodes de paiement</Typography>
          <Button
            variant="contained"
            startIcon={<Plus />}
            onClick={() => setOpenNewCardDialog(true)}
            sx={{
              bgcolor: "#F57C00",
              "&:hover": {
                bgcolor: "#EF6C00",
              },
            }}
          >
            Ajouter une carte
          </Button>
        </Box>

        <Grid container spacing={3}>
          {paymentMethods.map((method) => (
            <Grid item xs={12} sm={6} md={4} key={method.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                    }}
                  >
                    <Box>
                      <Typography variant="h6">
                        {method.brand.toUpperCase()}
                      </Typography>
                      <Typography>•••• {method.last4}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Expire {method.expiry}
                      </Typography>
                      {method.isDefault && (
                        <Typography
                          variant="caption"
                          color="primary"
                          display="block"
                        >
                          Carte par défaut
                        </Typography>
                      )}
                    </Box>
                    <IconButton
                      onClick={() => handleDeleteCard(method.id)}
                      color="error"
                    >
                      <Trash2 size={20} />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Historique des transactions */}
      <Box>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Historique des transactions
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID Transaction</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Montant</TableCell>
                <TableCell>Statut</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    {transaction.amount.toLocaleString()} FCFA
                  </TableCell>
                  <TableCell>
                    <Typography
                      color={
                        transaction.status === "completed"
                          ? "success.main"
                          : transaction.status === "failed"
                          ? "error.main"
                          : "warning.main"
                      }
                    >
                      {transaction.status.toUpperCase()}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Dialogue d'ajout de carte */}
      <Dialog
        open={openNewCardDialog}
        onClose={() => setOpenNewCardDialog(false)}
      >
        <DialogTitle>Ajouter une nouvelle carte</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Numéro de carte"
              value={newCardForm.cardNumber}
              onChange={(e) =>
                setNewCardForm({ ...newCardForm, cardNumber: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Date d'expiration"
                  placeholder="MM/YY"
                  value={newCardForm.expiry}
                  onChange={(e) =>
                    setNewCardForm({ ...newCardForm, expiry: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="CVV"
                  type="password"
                  value={newCardForm.cvv}
                  onChange={(e) =>
                    setNewCardForm({ ...newCardForm, cvv: e.target.value })
                  }
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Nom sur la carte"
              value={newCardForm.name}
              onChange={(e) =>
                setNewCardForm({ ...newCardForm, name: e.target.value })
              }
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewCardDialog(false)}>Annuler</Button>
          <Button onClick={handleAddCard} variant="contained" color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
