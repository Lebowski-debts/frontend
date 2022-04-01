import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';

import { ApiGetDebtor } from '@common/types/api/debtor';
import { ROOT_ROUTES } from '@common/constants/routes';
import { Avatar } from '@components/Avatar';
import { Space } from '@components/Space';
import { LocalizedLink } from '@components/LocalizedLink';

export interface Props extends ApiGetDebtor {
  lenderId: number;
  debtorId: number;
}

export const DebtorsListItem: React.FC<Props> = ({
  user,
  debtsInfo,
  lenderId,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent sx={{ padding: 18, ':last-child': { paddingBottom: 18 } }}>
        <Grid container>
          <LocalizedLink to={`${ROOT_ROUTES.USERS}/${user.id}`}>
            <Grid item display="flex" xs={12} alignItems="center">
              <Avatar
                userName={user.nickname || user.telegramUserLogin || ''}
                sx={{ marginRight: 10, height: 45, width: 45, fontSize: 24 }}
              />
              <Typography sx={{ fontSize: 20 }} color="secondary">
                {user.nickname || user.telegramUserLogin || ''}
              </Typography>
            </Grid>
          </LocalizedLink>

          <Grid marginTop={18} paddingLeft={16} width="100%">
            <Grid display="flex" item xs={12} marginBottom={3}>
              <Typography fontSize={16} display="block">
                {t('debtors.all_debts_sum')}:
              </Typography>
              <Typography fontSize={16} fontWeight={700}>
                <Space />
                {debtsInfo.initialSum}
              </Typography>
            </Grid>

            <Grid display="flex" item xs={12} marginBottom={3}>
              <Typography fontSize={16} display="block">
                {t('debtors.debts_count')}:
              </Typography>
              <Typography fontSize={16} fontWeight={700}>
                <Space />
                {debtsInfo.count}
              </Typography>
            </Grid>

            <Grid display="flex" item xs={12}>
              <Typography fontSize={16} display="block">
                {t('debtors.last_debt_from')}:
              </Typography>
              <Typography fontSize={16} fontWeight={700}>
                <Space />
                {debtsInfo.lastDebtDate}
              </Typography>
            </Grid>

            {debtsInfo.hasExpiredDebts && (
              <Grid item xs={12} marginTop={12}>
                <Typography
                  sx={{ color: theme.palette.error.light }}
                  fontSize={16}
                  display="block"
                  fontWeight="700"
                >
                  {t('debtors.expired_debts_encountered')}
                </Typography>
              </Grid>
            )}
          </Grid>

          <Grid display="flex" marginTop={24} width="100%">
            <Button
              sx={{ background: theme.palette.primary.light, width: '100%' }}
              size="large"
            >
              <LocalizedLink
                to={`${ROOT_ROUTES.DEBTORS}/debtorId/${user.id}/lenderId/${lenderId}/debts`}
              >
                <Typography color="white" fontSize={16}>
                  {t('common.details')}
                </Typography>
              </LocalizedLink>
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
