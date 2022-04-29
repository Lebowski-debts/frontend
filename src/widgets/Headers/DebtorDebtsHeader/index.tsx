import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Add, ArrowBackIos } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

import { ROOT_ROUTES } from '@common/constants/routes';
import { useAppSelector } from '@common/hooks/useAppSelector';
import { AppHeader } from '@components/AppHeader';
import { Avatar } from '@components/Avatar';
import { LocalizedLink } from '@components/LocalizedLink';
import { selectUser } from '@ducks/users/users.selector';

export const DebtorDebtsHeader = () => {
  const { debtorId } = useParams<{ debtorId: string }>();
  const debtor = useAppSelector((state) => selectUser(state, +debtorId));

  const { t } = useTranslation();

  return (
    <AppHeader>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Box display="flex">
          <LocalizedLink style={{ height: 24 }} to={ROOT_ROUTES.DEBTORS}>
            <ArrowBackIos />
          </LocalizedLink>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center">
          {debtor ? (
            <>
              <Avatar userName={debtor.nickname || debtor.telegramUserLogin} />
              <Typography fontSize={20} marginLeft={10}>
                {debtor.nickname || debtor.telegramUserLogin}
              </Typography>
            </>
          ) : (
            <Typography fontSize={20} marginLeft={10}>
              {t('common.loading')}
            </Typography>
          )}
        </Box>

        <Box display="flex">
          <LocalizedLink
            style={{ height: 24 }}
            to={`${ROOT_ROUTES.DEBTORS}/debtorId/${debtorId}/new-debt`}
          >
            <Add />
          </LocalizedLink>
        </Box>
      </Box>
    </AppHeader>
  );
};
