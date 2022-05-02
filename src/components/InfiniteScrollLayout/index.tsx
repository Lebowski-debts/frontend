import React from 'react';

import { Box, BoxProps, CircularProgress } from '@mui/material';

export interface Props extends Omit<BoxProps, 'onScroll'> {
  page: number;
  isProcessing: boolean;
  pagesCount: number;
  onPage?: number;
  bottomPositionOffset?: number;
  withProgressBar?: boolean;
  onScroll: (params: { isOnBottom: boolean; isLastPage: boolean }) => void;
}

export const InfiniteScrollLayout: React.FC<Props> = ({
  children,
  isProcessing,
  page,
  onPage,
  pagesCount,
  bottomPositionOffset = 0,
  withProgressBar = true,
  onScroll: _onScroll,
  ...boxProps
}) => {
  const onScroll: React.UIEventHandler<HTMLDivElement> = ({
    target: _target,
  }) => {
    const target = _target as HTMLElement;

    const { scrollTop, scrollHeight, offsetHeight } = target;

    const bottomPosition = scrollHeight - offsetHeight - bottomPositionOffset;

    const isOnBottom = scrollTop >= bottomPosition;
    _onScroll({ isOnBottom, isLastPage: pagesCount === page });
  };

  return (
    <Box overflow="auto" {...boxProps} onScroll={onScroll}>
      {children}

      {isProcessing && withProgressBar && (
        <Box display="flex" justifyContent="center" marginTop={10}>
          <CircularProgress sx={{ color: 'white' }} />
        </Box>
      )}
    </Box>
  );
};
