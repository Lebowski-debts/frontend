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
  contentBoxProps = {},
}) => {
  return (
    <>
      <AppHeader {...headerProps} />

      <Box
        {...contentBoxProps}
        sx={{
          marginTop: (theme) => theme.mixins.toolbar.minHeight,
          height: (theme) =>
            `calc(100% - ${theme.mixins.toolbar.minHeight || 0}px)`,
        }}
      >
        {children}
      </Box>
    </>
  );
};
