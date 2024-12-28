"use client";

import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  IconButton,
  Divider,
  Chip,
} from "@mui/material";
import { Bell, Package, Tag, ShoppingCart, X } from "lucide-react";

interface Notification {
  id: number;
  type: "order" | "promo" | "system";
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    type: "order",
    title: "Commande expédiée",
    message: "Votre commande ORD-001 a été expédiée",
    date: "2024-02-20T10:30:00",
    read: false,
  },
  {
    id: 2,
    type: "promo",
    title: "Promotion spéciale",
    message: "-20% sur tous les smartphones",
    date: "2024-02-19T15:45:00",
    read: true,
  },
  // Ajoutez d'autres notifications...
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "order":
      return <Package />;
    case "promo":
      return <Tag />;
    default:
      return <Bell />;
  }
};

export default function NotificationsPage() {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Bell size={24} className="mr-2" />
        <Typography variant="h5">Mes Notifications</Typography>
      </Box>

      <List>
        {notifications.map((notification, index) => (
          <React.Fragment key={notification.id}>
            <ListItem
              alignItems="flex-start"
              sx={{
                bgcolor: notification.read ? "transparent" : "action.hover",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <X />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: notification.read ? "grey.300" : "primary.main",
                  }}
                >
                  {getNotificationIcon(notification.type)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {notification.title}
                    {!notification.read && (
                      <Chip label="Nouveau" size="small" color="primary" />
                    )}
                  </Box>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {notification.message}
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      color="text.secondary"
                    >
                      {new Date(notification.date).toLocaleString()}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            {index < notifications.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
