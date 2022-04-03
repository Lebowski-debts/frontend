import React from 'react';
import { useParams } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';
import { Box, Typography } from '@mui/material';

import { LenderDebtorDebtsListContainer } from '@containers/LenderDebtor/LenderDebtorDebtsListContainer';
import { AppLayout } from '@components/AppLayout';
import { Avatar } from '@components/Avatar';
import { useAppSelector } from '@common/hooks/useAppSelector';
import { selectUser } from '@ducks/users/users.selector';
import { ROOT_ROUTES } from '@common/constants/routes';
import { LocalizedLink } from '@components/LocalizedLink';

export const LenderDebtorView: React.FC = () => {
  const { debtorId: _debtorId, lenderId: _lenderId } =
    useParams<{ debtorId: string; lenderId: string }>();

  const debtorId = +_debtorId;
  const lenderId = +_lenderId;

  const debtor = useAppSelector((state) => selectUser(state, debtorId));

  return (
    <AppLayout
      headerProps={{
        leftButton: (
          <LocalizedLink style={{ height: 24 }} to={ROOT_ROUTES.DEBTORS}>
            <ArrowBackIosIcon />
          </LocalizedLink>
        ),
        rightButton: <AddIcon />,
        children: debtor ? (
          <Box display="flex" alignItems="center">
            <Avatar userName={debtor.nickname || debtor.telegramUserLogin} />
            <Typography fontSize={20} marginLeft={10}>
              {debtor.nickname || debtor.telegramUserLogin}
            </Typography>
          </Box>
        ) : null,
      }}
    >
      <LenderDebtorDebtsListContainer debtorId={debtorId} lenderId={lenderId} />
    </AppLayout>
  );
};
