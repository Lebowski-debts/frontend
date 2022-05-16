import React from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';

import { AppHeader } from '@components/AppHeader';

export interface Props {
  setIsSidebarOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DebtorsHeader = ({ setIsSidebarOpened }: Props) => {
  const { t } = useTranslation();

  return (
    <AppHeader>
      <Menu onClick={() => setIsSidebarOpened(true)} />
      <Typography
        textAlign="center"
        width="100%"
        variant="h6"
        color="secondary"
      >
        {t('debtors.my_debtors')}
      </Typography>
    </AppHeader>
  );
};
