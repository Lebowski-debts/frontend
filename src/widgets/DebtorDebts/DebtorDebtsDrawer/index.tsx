import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  AccountCircle,
  ArrowForwardIos,
  FilterAlt,
  Sort,
} from '@mui/icons-material';
import {
  Drawer,
  DrawerProps,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

export const DebtorDebtsDrawer = (props: DrawerProps) => {
  const { t } = useTranslation();
  return (
    <Drawer
      container={() => document.getElementById('root')}
      anchor="top"
      PaperProps={{
        sx: { marginTop: (theme) => theme.mixins.toolbar.minHeight },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgb(0 0 0 / 1%)',
          backdropFilter: 'blur(5px)',
        },
      }}
      {...props}
    >
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>

            <ListItemText primary={t('debts.see_profile')} />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <FilterAlt />
            </ListItemIcon>

            <ListItemText primary={t('debts.filters')} />

            <ArrowForwardIos fontSize="small" />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Sort />
            </ListItemIcon>

            <ListItemText primary={t('debts.sorting')} />

            <ArrowForwardIos fontSize="small" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
