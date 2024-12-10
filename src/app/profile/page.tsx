"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  Grid,
  Button,
  TextField,
  List,
  ListItem,
  Divider
} from "@mui/material";

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Mon Profil
      </Typography>

      <Paper sx={{ mt: 3 }}>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
          <Tab label="Informations Personnelles" />
          <Tab label="Mes Commandes" />
          <Tab label="Adresses" />
          <Tab label="Sécurité" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nom"
                  defaultValue="John Doe"
                />
              </Grid>
              {/* Autres champs... */}
            </Grid>
          )}

          {activeTab === 1 && (
            <List>
              {/* Liste des commandes */}
            </List>
          )}
          
          {/* Autres onglets... */}
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage; 