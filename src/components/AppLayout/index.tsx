import React from 'react';

import { Box, BoxProps } from '@mui/material';

import { AppHeader, Props as HeaderProps } from '@components/AppHeader';

export interface Props {
  headerProps?: HeaderProps & { children?: React.ReactNode };
  layoutBoxProps?: BoxProps;
  contentBoxProps?: BoxProps;
}

export const AppLayout: React.FC<Props> = ({
  children = null,
  headerProps = {},
  layoutBoxProps = {},
  contentBoxProps = {},
}) => {
  return (
    <Box height="100%" {...layoutBoxProps}>
      <AppHeader {...headerProps} />

      <Box {...contentBoxProps} height="calc(100% - 60px)">
        {children}
      </Box>
    </Box>
  );
};
