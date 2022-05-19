import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import {
  AccountCircle,
  ArrowForwardIos,
  FilterAlt,
  Sort,
} from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { LocalizedLink } from '@components/LocalizedLink';
import { ROOT_ROUTES } from '@common/constants/routes';

import { TabName } from '../types';

export interface Props {
  navigateToTab: (tabName: TabName) => void;
}

export const DebtorDebtsDrawerMain = ({ navigateToTab }: Props) => {
  const { debtorId } = useParams<{ debtorId: string }>();
  const { t } = useTranslation();

  return (
    <List>
      <ListItem>
        <LocalizedLink to={ROOT_ROUTES.getUserRoute(+debtorId)}>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircle color="secondary" />
            </ListItemIcon>

            <ListItemText primary={t('debts.see_profile')} />
          </ListItemButton>
        </LocalizedLink>
      </ListItem>

      <ListItem>
        <ListItemButton onClick={() => navigateToTab('FILTERS')}>
          <ListItemIcon>
            <FilterAlt color="secondary" />
          </ListItemIcon>

          <ListItemText primary={t('debts.filters')} />

          <ArrowForwardIos fontSize="small" />
        </ListItemButton>
      </ListItem>

      <ListItem>
        <ListItemButton onClick={() => navigateToTab('SORTING')}>
          <ListItemIcon>
            <Sort color="secondary" />
          </ListItemIcon>

          <ListItemText primary={t('debts.sorting')} />

          <ArrowForwardIos fontSize="small" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};
