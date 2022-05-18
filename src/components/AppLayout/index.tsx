import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Box, BoxProps, Theme } from '@mui/material';

export interface Props extends BoxProps {
  header?: React.ReactNode;
  contentBoxProps?: BoxProps;
}

export const AppLayout: React.FC<Props> = ({
  children = null,
  header = null,
  ...contentBoxProps
}) => {
  const [, setPathname] = useState('');
  const location = useLocation();
  const headerRef = useRef<HTMLDivElement>();

  const defaultStyles = headerRef.current?.innerHTML
    ? {
        marginTop: (theme: Theme) => theme.mixins.toolbar.minHeight,
        height: (theme: Theme) =>
          `calc(100% - ${theme.mixins.toolbar.minHeight || 0}px)`,
      }
    : {};

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Box ref={headerRef}>{header}</Box>

      <Box
        {...contentBoxProps}
        sx={{
          ...defaultStyles,
          ...contentBoxProps.sx,
        }}
      >
        {children}
      </Box>
    </>
  );
};
