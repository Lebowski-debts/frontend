import React from 'react';
import { Link } from 'react-router-dom';

import { Card, CardContent, Typography } from '@mui/material';

import { ApiGetDebtor } from '@common/types/api/debtor';
import { ROOT_ROUTES } from '@common/constants/routes';
import { Avatar } from '@components/Avatar';

export const DebtorsListItem: React.FC<ApiGetDebtor> = ({ user }) => (
  <Link to={`${ROOT_ROUTES.DEBTORS}/${user.id}/debts`}>
    <Card>
      <CardContent>
        <Avatar userName={user.nickname || user.telegramUserLogin || ''} />
        <Typography sx={{ fontSize: 26 }}>
          {user.nickname || user.telegramUserLogin || ''}
        </Typography>
      </CardContent>
    </Card>
  </Link>
);
