import React from 'react';

import { Menu } from '@mui/icons-material';
import { Typography } from '@mui/material';

import { AppHeader } from '@components/AppHeader';

export interface Props {
  setIsSidebarOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

export const HeaderWithSideBar = ({ setIsSidebarOpened, title }: Props) => {
  return (
    <AppHeader>
      <Menu onClick={() => setIsSidebarOpened(true)} />
      <Typography
        textAlign="center"
        width="calc(100% - 46px)"
        variant="h6"
        color="secondary"
      >
        {title}
      </Typography>
    </AppHeader>
  );
};
