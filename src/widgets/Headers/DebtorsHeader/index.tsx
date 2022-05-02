import React from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';

import { AppHeader } from '@components/AppHeader';

export const DebtorsHeader = () => {
  const { t } = useTranslation();

  return (
    <AppHeader>
      <Typography textAlign="center" width="100%" fontSize={20}>
        {t('debtors.my_debtors')}
      </Typography>
    </AppHeader>
  );
};
