import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

import { AbsoluteProgress } from '@components/AbsoluteProgress';
import { GetDebtorsPayload } from '@ducks/debtors/debtors.types';
import { InfiniteScrollLayout } from '@components/InfiniteScrollLayout';
import {
  NormalizedList,
  PaginatedHttpSuccessResponse,
} from '@common/types/api';
import { ApiGetDebtorDebtsCommonInfo } from '@common/types/api/debtor';
import { AsyncState } from '@common/store/helpers';

const myTelegramUserId = +(process.env.TELEGRAM_USER_ID || 0);
export interface Props
  extends AsyncState<
    PaginatedHttpSuccessResponse<
      NormalizedList<ApiGetDebtorDebtsCommonInfo, number>
    >,
    unknown
  > {
  getData: (payload: GetDebtorsPayload) => void;
  resetData: () => void;
  DebtorsListItemContainer: React.FC<{ userId: number }>;
  noDebtorsYetLocale?: string;
}

export const DebtorsList: React.FC<Props> = ({
  DebtorsListItemContainer,
  getData,
  resetData,
  isProcessing = false,
  value,
  noDebtorsYetLocale = 'debtors.no_debtors_yet',
}) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  const { data, currentPage, pagesCount } = value || {};

  useEffect(() => {
    getData({
      userId: myTelegramUserId,
      page: 1,
      onPage: 5,
    });

    return () => resetData();
  }, [page]);

  return (
    <InfiniteScrollLayout
      onScroll={({ isLastPage, isOnBottom }) => {
        if (isLastPage || isOnBottom || isProcessing) return;

        setPage((_page) => _page + 1);
      }}
      page={page}
      isProcessing={isProcessing && !!currentPage}
      pagesCount={pagesCount || 1}
      justifyContent="center"
      height="100%"
      width="100%"
      position="relative"
      padding="14px 14px"
      overflow="auto"
    >
      {isProcessing && !currentPage && <AbsoluteProgress />}

      {data?.keys.map((id, index) => (
        <Box key={id} marginBottom={index === data?.keys.length - 1 ? 0 : 20}>
          <DebtorsListItemContainer userId={id} />
        </Box>
      ))}

      {!data?.keys.length && !isProcessing && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          width="100%"
        >
          <Typography fontSize={24}>{t(noDebtorsYetLocale)}</Typography>
        </Box>
      )}
    </InfiniteScrollLayout>
  );
};
