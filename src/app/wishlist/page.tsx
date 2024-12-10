"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Rating,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Switch,
  Snackbar,
  Alert,
} from "@mui/material";
import { ShoppingCart, Share2, MoreVertical, Plus, Bell } from "lucide-react";

const WishlistPage: React.FC = () => {
  // États
  const [lists, setLists] = useState([
    {
      id: 1,
      name: "Ma liste principale",
      items: [
        {
          id: 1,
          name: "Chaussure de sport",
          price: 150000,
          oldPrice: 180000,
          brand: "Nike",
          rating: 4.5,
          image: "https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg",
          discount: 25,
          notifications: true,
        },
        {
          id: 2,
          name: "T-shirt",
          price: 68000,
          oldPrice: 80000,
          brand: "Adidas",
          rating: 4.0,
          image: "https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg",
          discount: 15,
          notifications: false,
        },
      ],
    },
    {
      id: 2,
      name: "Pour plus tard",
      items: [],
    },
  ]);

  const [selectedList, setSelectedList] = useState(1);
  const [openNewList, setOpenNewList] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });

  // Gestionnaires d'événements
  const handleCreateList = () => {
    if (newListName.trim()) {
      setLists([...lists, {
        id: lists.length + 1,
        name: newListName,
        items: [],
      }]);
      setOpenNewList(false);
      setNewListName("");
    }
  };

  const handleShare = () => {
    // Simulation d'envoi de partage
    setShareDialogOpen(false);
    setShareEmail("");
    setNotification({
      open: true,
      message: "Liste partagée avec succès !",
      severity: "success",
    });
  };

  const handleNotificationToggle = (itemId: number) => {
    setLists(lists.map(list => ({
      ...list,
      items: list.items.map(item => 
        item.id === itemId ? { ...item, notifications: !item.notifications } : item
      ),
    })));
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* En-tête avec sélection de liste */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h4">Mes Listes de Souhaits</Typography>
          <IconButton onClick={() => setOpenNewList(true)} color="primary">
            <Plus />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Share2 />}
            onClick={() => setShareDialogOpen(true)}
          >
            Partager
          </Button>
        </Box>
      </Box>

      {/* Sélecteur de liste */}
      <Box sx={{ mb: 4 }}>
        <List sx={{ display: "flex", gap: 2 }}>
          {lists.map((list) => (
            <ListItem
              key={list.id}
              onClick={() => setSelectedList(list.id)}
              sx={{
                cursor: "pointer",
                bgcolor: selectedList === list.id ? "primary.main" : "background.paper",
                color: selectedList === list.id ? "white" : "inherit",
                borderRadius: 1,
              }}
            >
              <ListItemText primary={list.name} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Grille de produits */}
      <Grid container spacing={3}>
        {lists.find(l => l.id === selectedList)?.items.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card className="relative group rounded-lg">
              <CardContent className="p-4 flex flex-col h-full">
                <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                  <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <MoreVertical />
                  </IconButton>
                </Box>

                <div className="aspect-square relative mb-4 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-110 rounded-lg"
                  />
                </div>

                <Typography variant="h6" className="text-center mb-2">
                  {item.name}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Box>
                    <Typography variant="h6" color="primary">
                      {item.price} CFA
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textDecoration: "line-through" }}>
                      {item.oldPrice} CFA
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Bell size={16} />
                    <Switch
                      size="small"
                      checked={item.notifications}
                      onChange={() => handleNotificationToggle(item.id)}
                    />
                  </Box>
                </Box>

                <Rating value={item.rating} readOnly size="small" sx={{ mb: 2 }} />

                <Button
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  fullWidth
                  sx={{ bgcolor: "#F57C00" }}
                >
                  Ajouter au panier
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog pour nouvelle liste */}
      <Dialog open={openNewList} onClose={() => setOpenNewList(false)}>
        <DialogTitle>Créer une nouvelle liste</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom de la liste"
            fullWidth
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <Button onClick={handleCreateList} sx={{ mt: 2 }}>
            Créer
          </Button>
        </DialogContent>
      </Dialog>

      {/* Dialog pour partage */}
      <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)}>
        <DialogTitle>Partager la liste</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={shareEmail}
            onChange={(e) => setShareEmail(e.target.value)}
          />
          <Button onClick={handleShare} sx={{ mt: 2 }}>
            Partager
          </Button>
        </DialogContent>
      </Dialog>

      {/* Menu contextuel */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>Déplacer vers une autre liste</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Supprimer</MenuItem>
      </Menu>

      {/* Notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.severity as "success" | "error"}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default WishlistPage; 