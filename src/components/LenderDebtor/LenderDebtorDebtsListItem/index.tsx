import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';

import { ApiGetDebt } from '@common/types/api/debt';
import { Space } from '@components/Space';
import { Circle } from '@components/Circle';
import { formatDate } from '@common/helpers/dates';
import { prettifyNumber } from '@common/helpers/number';

export interface Props extends ApiGetDebt {
  index: number;
}

export const LenderDebtorDebtsListItem: React.FC<Props> = ({
  actualSum,
  createdAt,
  expireDate,
  initialSum,
  isExpired,
  paymentStatus,
  index,
}) => {
  const { t } = useTranslation();
  const { palette } = useTheme();

  const colorsByDebtStatus = {
    NEW: palette.secondary.main,
    IN_PROGRESS: palette.secondary.main,
    PAID: palette.success.light,
  };

  const colorByDebtStatus = isExpired
    ? palette.error.main
    : colorsByDebtStatus[paymentStatus];

  return (
    <Card>
      <CardContent sx={{ paddingBottom: '12px !important' }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={33}
        >
          <Box display="flex">
            <Typography fontSize={16} fontWeight={500}>
              {index}. {t('debts.debt_created_at')}
            </Typography>

            <Space />

            <Typography fontSize={16} fontWeight={700}>
              {formatDate(createdAt)}
            </Typography>
          </Box>

          <Circle color={colorByDebtStatus} />
        </Box>

        <Grid container rowSpacing={3} paddingLeft={20}>
          <Grid item xs={12} display="flex">
            <Typography fontSize={16}>{t('debts.debt_sum')}:</Typography>
            <Space />
            {prettifyNumber(initialSum)}
          </Grid>

          <Grid item xs={12} display="flex">
            <Typography fontSize={16}>{t('debts.debt_rest')}:</Typography>
            <Space />
            {prettifyNumber(actualSum)}
          </Grid>

          <Grid item xs={12} display="flex">
            <Typography fontSize={16}>{t('debts.debt_expires_at')}:</Typography>
            <Space />
            {formatDate(expireDate)}
          </Grid>
        </Grid>

        <Button
          sx={{
            background: palette.primary.light,
            marginTop: 45,
          }}
          fullWidth
          size="large"
        >
          <Typography color="white" fontSize={16}>
            {t('debts.pay_the_debt_off')}
          </Typography>
        </Button>
      </CardContent>
    </Card>
  );
};
