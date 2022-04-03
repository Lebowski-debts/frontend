import React from 'react';

import { Box, BoxProps, useTheme } from '@mui/material';

export interface Props {
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  boxProps?: BoxProps;
}

export const AppHeader: React.FC<Props> = ({
  leftButton = null,
  rightButton = null,
  children = null,
  boxProps = {},
}) => {
  const { palette } = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      height={60}
      bgcolor={palette.primary.main}
      color={palette.secondary.main}
      padding="0 14px"
      {...boxProps}
    >
      {leftButton}
      {children}
      {rightButton}
    </Box>
  );
};
