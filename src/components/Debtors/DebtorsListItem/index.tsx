import React from 'react';
import { Link } from 'react-router-dom';

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
  return (
    <Link
      to={`${ROOT_ROUTES.DEBTORS}/${user.id}/debts`}
      style={{ display: 'block' }}
    >
      <Card>
        <CardContent>
          <Grid container>
            <Grid item display="flex" xs={12} alignItems="center">
              <Avatar
                userName={user.nickname || user.telegramUserLogin || ''}
                sx={{ marginRight: 10, height: 50, width: 50, fontSize: 24 }}
              />
              <Typography sx={{ fontSize: 26 }} color="primary">
                {user.nickname || user.telegramUserLogin || ''}
              </Typography>
            </Grid>

            <Grid marginTop={18} paddingLeft={16}>
              <Grid display="flex" item xs={12} marginBottom={3}>
                <Typography fontSize={20} display="block">
                  Сумма всех долгов:
                </Typography>
                <Typography fontSize={20} fontWeight={700}>
                  <Space />
                  {debtsInfo.initialSum}
                </Typography>
              </Grid>

              <Grid display="flex" item xs={12} marginBottom={3}>
                <Typography fontSize={20} display="block">
                  Сколько раз занимал:
                </Typography>
                <Typography fontSize={20} fontWeight={700}>
                  <Space />
                  {debtsInfo.count}
                </Typography>
              </Grid>

              <Grid display="flex" item xs={12}>
                <Typography fontSize={20} display="block">
                  Последний займ от:
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
                    Есть просроченные долги!
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
};
