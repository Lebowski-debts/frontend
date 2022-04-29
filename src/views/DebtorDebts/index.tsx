import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  AccountCircle,
  ArrowForwardIos,
  FilterAlt,
  Sort,
} from '@mui/icons-material';

import { DebtorDebtsListContainer } from '@containers/DebtorDebts/DebtorDebtsListContainer';

export const DebtorDebtsView: React.FC = () => {
  const { debtorId: _debtorId } = useParams<{ debtorId: string }>();
  const { t } = useTranslation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const debtorId = +_debtorId;

  return (
    <>
      <DebtorDebtsListContainer debtorId={debtorId} />
      <Drawer
        container={() => document.getElementById('root')}
        anchor="top"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{
          sx: { marginTop: (theme) => theme.mixins.toolbar.minHeight },
        }}
        BackdropProps={{
          sx: {
            backgroundColor: 'rgb(0 0 0 / 1%)',
            backdropFilter: 'blur(5px)',
          },
        }}
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
    </>
  );
};
