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
import { formatDate } from '@common/helpers/dates';
import { prettifyNumber } from '@common/helpers/number';

export interface Props extends ApiGetDebtor {
  debtorId: number;
}

export const DebtorsListItem: React.FC<Props> = ({ user, debtsInfo }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent sx={{ padding: 18, ':last-child': { paddingBottom: 18 } }}>
        <Grid container>
          <LocalizedLink
            to={`${ROOT_ROUTES.USERS}/${user.id || user.telegramUserId || ''}`}
          >
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
                {prettifyNumber(debtsInfo.initialSum)}
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
                {formatDate(debtsInfo.lastDebtDate)}
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
            <LocalizedLink
              to={ROOT_ROUTES.getDebtorDebtsRoute(
                user.telegramUserId || user.id || 0
              )}
              style={{ width: '100%' }}
            >
              <Button
                fullWidth
                color="primary"
                variant="contained"
                size="large"
              >
                {t('common.details')}
              </Button>
            </LocalizedLink>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
