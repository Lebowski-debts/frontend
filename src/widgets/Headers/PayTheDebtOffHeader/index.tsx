import React from 'react';
import { useTranslation } from 'react-i18next';

import { ArrowBackIos } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

import { usePrevRoute } from '@common/hooks/usePrevRoute';
import { AppHeader } from '@components/AppHeader';
import { LocalizedLink } from '@components/LocalizedLink';

export const PayTheDebtOffHeader = () => {
  const { t } = useTranslation();
  const prevRoute = usePrevRoute();

  return (
    <AppHeader>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Box display="flex">
          <LocalizedLink style={{ height: 24 }} to={prevRoute}>
            <ArrowBackIos />
          </LocalizedLink>
        </Box>

        <Box display="flex">
          <Typography variant="h6" color="secondary">
            {t('pay_the_debt_off.pay_the_debt_off_form_title')}
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={24}
        />
      </Box>
    </AppHeader>
  );
};
