import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

import { ListItem, ListItemButton, ListItemText } from '@mui/material';

import { LocalizedLink } from '@components/LocalizedLink';

export interface Props {
  route: string;
  onCloseDarwer: () => void;
}

export const NavigationListItem = ({ route, onCloseDarwer }: Props) => {
  const { t } = useTranslation();
  const { locale } = useParams<{ locale: string }>();
  const { pathname } = useLocation();

  const currentRoute = pathname.replace(`/${locale}`, '');

  const isCurrentRoute = currentRoute === route;

  return (
    <LocalizedLink to={route} onClick={onCloseDarwer}>
      <ListItem>
        <ListItemButton>
          <ListItemText
            sx={{ color: isCurrentRoute ? 'secondary' : '#ffff' }}
            primary={t(`navigation.${route.replace('/', '')}`)}
          />
        </ListItemButton>
      </ListItem>
    </LocalizedLink>
  );
};
