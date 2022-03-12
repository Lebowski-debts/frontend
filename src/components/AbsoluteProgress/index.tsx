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
      container
      {...containerGridProps}
      sx={{ backdropFilter: 'blur(5px)', zIndex: 1, ...containerGridProps.sx }}
    >
      <CircularProgress
        {...props}
        sx={{ color: theme.palette.primary.dark, ...props.sx }}
      />
    </Grid>
  );
};
