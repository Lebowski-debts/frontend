import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, Grid, Typography, useTheme } from '@mui/material';

import { ApiGetDebtor } from '@common/types/api/debtor';
import { ROOT_ROUTES } from '@common/constants/routes';
import { Avatar } from '@components/Avatar';
import { Space } from '@components/Space';

export const DebtorsListItem: React.FC<ApiGetDebtor> = ({
  user,
  debtsInfo,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent sx={{ padding: 18, ':last-child': { paddingBottom: 18 } }}>
        <Grid container>
          <Link to={`${ROOT_ROUTES.USERS}/${user.id}`}>
            <Grid item display="flex" xs={12} alignItems="center">
              <Avatar
                userName={user.nickname || user.telegramUserLogin || ''}
                sx={{ marginRight: 10, height: 50, width: 50, fontSize: 24 }}
              />
              <Typography sx={{ fontSize: 26 }} color="primary">
                {user.nickname || user.telegramUserLogin || ''}
              </Typography>
            </Grid>
          </Link>

          <Grid marginTop={18} paddingLeft={16} width="100%">
            <Grid display="flex" item xs={12} marginBottom={3}>
              <Typography fontSize={20} display="block">
                {t('debtors.all_debts_sum')}
              </Typography>
              <Typography fontSize={20} fontWeight={700}>
                <Space />
                {debtsInfo.initialSum}
              </Typography>
            </Grid>

            <Grid display="flex" item xs={12} marginBottom={3}>
              <Typography fontSize={20} display="block">
                {t('debtors.debts_count')}
              </Typography>
              <Typography fontSize={20} fontWeight={700}>
                <Space />
                {debtsInfo.count}
              </Typography>
            </Grid>

            <Grid display="flex" item xs={12}>
              <Typography fontSize={20} display="block">
                {t('debtors.last_debt_from')}
              </Typography>
              <Typography fontSize={20} fontWeight={700}>
                <Space />
                {debtsInfo.lastDebtDate}
              </Typography>
            </Grid>

            {debtsInfo.hasExpiredDebts && (
              <Grid item xs={12} marginTop={12}>
                <Typography
                  sx={{ color: theme.palette.error.light }}
                  fontSize={20}
                  display="block"
                  fontWeight="700"
                >
                  {t('debtors.expired_debts_encountered')}
                </Typography>
              </Grid>
            )}

            <Grid justifyContent="flex-end" display="flex" marginTop={24}>
              <Link
                to={`${ROOT_ROUTES.DEBTORS}/${user.id}/debts`}
                // style={{ display: 'block', marginTop: 24, marginLeft: 'auto' }}
              >
                <Typography color="primary" fontSize={20} fontWeight={700}>
                  {t('common.details')}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
