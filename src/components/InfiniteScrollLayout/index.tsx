import React, { useEffect, useState } from 'react';

import { Box, BoxProps, CircularProgress } from '@mui/material';

import { ApiListParams } from '@common/types/api';

export interface Props extends BoxProps {
  isProcessing: boolean;
  initialPage?: number;
  pagesCount: number;
  onPage?: number;
  getData: (paginationData: ApiListParams) => void;
  bottomPositionOffset?: number;
  withProgressBar?: boolean;
}

export const InfiniteScrollLayout: React.FC<Props> = ({
  children,
  isProcessing,
  getData,
  initialPage = 1,
  onPage,
  pagesCount,
  bottomPositionOffset = 0,
  withProgressBar = true,
  ...boxProps
}) => {
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    if (page < 2) return;

    getData({ page });
  }, [page]);

  const onScroll: React.UIEventHandler<HTMLDivElement> = ({
    target: _target,
  }) => {
    setPage((actualPage) => {
      if (pagesCount === actualPage || isProcessing) return actualPage;

      const target = _target as HTMLElement;

      const { scrollTop, scrollHeight, offsetHeight } = target;

      const bottomPosition = scrollHeight - offsetHeight - bottomPositionOffset;

      const isOnBottom = scrollTop >= bottomPosition;

      if (isOnBottom) {
        return actualPage + 1;
      }

      return actualPage;
    });
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
