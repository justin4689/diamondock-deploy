"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import { Settings, Lock, Bell, Globe, Shield } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    twoFactorAuth: true,
    darkMode: false,
    language: 'fr',
  });

  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSettingChange = (setting: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [setting]: event.target.checked });
  };

  const handlePasswordSubmit = () => {
    // Logique de changement de mot de passe
    setOpenPasswordDialog(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Settings size={24} className="mr-2" />
        <Typography variant="h5">Paramètres</Typography>
      </Box>

      {/* Sécurité */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Shield size={20} className="mr-2" />
          Sécurité
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Authentification à deux facteurs"
              secondary="Sécurisez votre compte avec la 2FA"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={settings.twoFactorAuth}
                onChange={handleSettingChange('twoFactorAuth')}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="Changer le mot de passe"
              secondary="Modifier votre mot de passe actuel"
            />
            <ListItemSecondaryAction>
              <Button 
                variant="outlined" 
                startIcon={<Lock />}
                onClick={() => setOpenPasswordDialog(true)}
              >
                Modifier
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Box>

      {/* Notifications */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Bell size={20} className="mr-2" />
          Notifications
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Notifications par email"
              secondary="Recevoir des mises à jour par email"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={settings.emailNotifications}
                onChange={handleSettingChange('emailNotifications')}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="Notifications push"
              secondary="Recevoir des notifications sur votre appareil"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={settings.pushNotifications}
                onChange={handleSettingChange('pushNotifications')}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="Emails marketing"
              secondary="Recevoir des offres promotionnelles"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={settings.marketingEmails}
                onChange={handleSettingChange('marketingEmails')}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Box>

      {/* Dialogue de changement de mot de passe */}
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
        <DialogTitle>Changer le mot de passe</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              type="password"
              label="Mot de passe actuel"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="password"
              label="Nouveau mot de passe"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="password"
              label="Confirmer le nouveau mot de passe"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Annuler</Button>
          <Button onClick={handlePasswordSubmit} variant="contained" color="primary">
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 