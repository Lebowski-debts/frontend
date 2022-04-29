import React from 'react';

import { AppBar, AppBarProps, Toolbar, ToolbarProps } from '@mui/material';

export interface Props extends AppBarProps {
  toolbarProps?: ToolbarProps;
}

export const AppHeader: React.FC<Props> = ({
  children = null,
  toolbarProps = {},
  ...appBarProps
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      {...appBarProps}
    >
      <Toolbar
        sx={{
          // display: 'flex',
          // justifyContent: 'space-between',
          // alignItems: 'center',
          padding: '0 14px',
          ...toolbarProps?.sx,
        }}
        {...toolbarProps}
      >
        {children}
      </Toolbar>
    </AppBar>
  );
};
