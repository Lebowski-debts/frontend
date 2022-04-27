import React from 'react';

import {
  CircularProgress,
  CircularProgressProps,
  Grid,
  GridProps,
} from '@mui/material';

export interface Props extends CircularProgressProps {
  containerGridProps?: GridProps;
}

export const AbsoluteProgress: React.FC<Props> = ({
  containerGridProps = {},
  ...props
}) => {
  return (
    <Grid
      position="absolute"
      justifyContent="center"
      alignContent="center"
      height="100%"
      width="100%"
      left={0}
      top={0}
      container
      {...containerGridProps}
      sx={{ backdropFilter: 'blur(5px)', zIndex: 1, ...containerGridProps.sx }}
    >
      <CircularProgress {...props} sx={{ color: 'white', ...props.sx }} />
    </Grid>
  );
};
