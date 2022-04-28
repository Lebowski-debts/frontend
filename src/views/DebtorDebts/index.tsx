import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  AccountCircle,
  ArrowForwardIos,
  FilterAlt,
  Sort,
} from '@mui/icons-material';

import { DebtorDebtsListContainer } from '@containers/DebtorDebts/DebtorDebtsListContainer';
import { AppLayout } from '@components/AppLayout';
import { Avatar } from '@components/Avatar';
import { useAppSelector } from '@common/hooks/useAppSelector';
import { selectUser } from '@ducks/users/users.selector';
import { ROOT_ROUTES } from '@common/constants/routes';
import { LocalizedLink } from '@components/LocalizedLink';

export const DebtorDebtsView: React.FC = () => {
  const { debtorId: _debtorId } = useParams<{ debtorId: string }>();
  const { t } = useTranslation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const debtorId = +_debtorId;

  const debtor = useAppSelector((state) => selectUser(state, debtorId));

  return (
    <AppLayout
      headerProps={{
        leftButton: (
          <LocalizedLink style={{ height: 24 }} to={ROOT_ROUTES.DEBTORS}>
            <ArrowBackIosIcon />
          </LocalizedLink>
        ),
        rightButton: (
          <LocalizedLink
            style={{ height: 24 }}
            to={`${ROOT_ROUTES.DEBTORS}/debtorId/${debtorId}/new-debt`}
          >
            <AddIcon />
          </LocalizedLink>
        ),
        children: (
          <Box
            display="flex"
            alignItems="center"
            onClick={() => setIsDrawerOpen(true)}
          >
            {debtor ? (
              <>
                <Avatar
                  userName={debtor.nickname || debtor.telegramUserLogin}
                />
                <Typography fontSize={20} marginLeft={10}>
                  {debtor.nickname || debtor.telegramUserLogin}
                </Typography>
              </>
            ) : (
              <Typography fontSize={20} marginLeft={10}>
                {t('common.loading')}
              </Typography>
            )}
          </Box>
        ),
      }}
    >
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
    </AppLayout>
  );
};
