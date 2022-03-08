import React from 'react';

import {
  CircularProgress,
  CircularProgressProps,
  Grid,
  GridProps,
  useTheme,
} from '@mui/material';

export interface Props extends CircularProgressProps {
  containerGridProps?: GridProps;
}

export const AbsoluteProgress: React.FC<Props> = ({
  containerGridProps = {},
  ...props
}) => {
  const theme = useTheme();

  return (
    <Grid
      position="absolute"
      justifyContent="center"
      alignContent="center"
      height="100%"
      width="100%"
      sx={{ backdropFilter: 'blur(5px)' }}
      container
      {...containerGridProps}
    >
      <CircularProgress sx={{ color: theme.palette.primary.dark }} {...props} />
    </Grid>
  );
};
