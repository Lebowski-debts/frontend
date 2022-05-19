import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Add, ArrowBackIos } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

import { ROOT_ROUTES } from '@common/constants/routes';
import { useAppSelector } from '@common/hooks/useAppSelector';
import { AppHeader } from '@components/AppHeader';
import { Avatar } from '@components/Avatar';
import { LocalizedLink } from '@components/LocalizedLink';
import { selectUser } from '@ducks/users/users.selector';
import { DebtsDrawer } from '@widgets/Debts/DebtsDrawer';
import { getUserByIdSlice } from '@ducks/users/users.slice';

export const LenderDebtorDebtsHeader = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { lenderId, debtorId } =
    useParams<{ lenderId: string; debtorId: string }>();

  const currentUserId = process.env.TELEGRAM_USER_ID;

  let userId = +lenderId;

  if (lenderId === currentUserId) {
    userId = +debtorId;
  }

  const headerUser = useAppSelector((state) => selectUser(state, userId));

  const dispatch = useDispatch();

  useEffect(() => {
    if (!headerUser) {
      dispatch(getUserByIdSlice.actions.request({ userId }));
    }
  }, [headerUser]);

  const { t } = useTranslation();

  const prevRoute =
    lenderId === currentUserId ? ROOT_ROUTES.DEBTORS : ROOT_ROUTES.LENDERS;

  return (
    <>
      <AppHeader onClick={() => setIsDrawerOpen((open) => !open)}>
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

          <Box display="flex" justifyContent="center" alignItems="center">
            {headerUser ? (
              <>
                <Avatar
                  userName={headerUser.nickname || headerUser.telegramUserLogin}
                />
                <Typography variant="h6" color="secondary" marginLeft={10}>
                  {headerUser.nickname || headerUser.telegramUserLogin}
                </Typography>
              </>
            ) : (
              <Typography variant="h6" color="secondary" marginLeft={10}>
                {t('common.loading')}
              </Typography>
            )}
          </Box>

          <Box display="flex">
            {userId === +debtorId && (
              <LocalizedLink
                style={{ height: 24 }}
                to={`${ROOT_ROUTES.DEBTORS}/debtorId/${userId}/new-debt`}
              >
                <Add />
              </LocalizedLink>
            )}
          </Box>
        </Box>
      </AppHeader>

      <DebtsDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};
