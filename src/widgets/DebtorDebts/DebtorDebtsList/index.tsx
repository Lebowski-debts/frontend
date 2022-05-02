import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Grid, Typography } from '@mui/material';

import { AbsoluteProgress } from '@components/AbsoluteProgress';
import { AsyncState } from '@common/store/helpers';
import { PaginatedHttpSuccessResponse } from '@common/types/api';
import { InfiniteScrollLayout } from '@components/InfiniteScrollLayout';
import { DebtorDebtsListItemContainer } from '@containers/DebtorDebts/DebtorDebtsListItemContainer';
import {
  ApiGetDebtorsParams,
  ExpirationStatus,
  PaymentStatus,
} from '@common/types/api/debtor';
import { useSearchParams } from '@common/hooks/useSearchParams';
import { useEffectMounted } from '@common/hooks/useEffectMounted';
import { useOnUnmount } from '@common/hooks/useOnUnmount';

export interface Props
  extends AsyncState<PaginatedHttpSuccessResponse<number[]>, unknown> {
  getData: (params: ApiGetDebtorsParams) => void;
  resetData: () => void;
}

export const DebtorDebtsList: React.FC<Props> = ({
  getData,
  resetData,
  isProcessing = false,
  value,
}) => {
  const { data = [], pagesCount, currentPage } = value || {};
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  const { getParam, updateParam } = useSearchParams();

  const paymentStatusList = getParam('paymentStatuses') as PaymentStatus;
  const expirationStatus = getParam('expirationStatus') as ExpirationStatus;

  useEffectMounted(() => {
    resetData();
    setPage(1);
    getData({ page: 1, paymentStatusList, expirationStatus });
  }, [paymentStatusList, expirationStatus]);

  useEffect(() => {
    getData({ page, paymentStatusList, expirationStatus });
  }, [page]);

  useOnUnmount(() => {
    resetData();
  });

  useEffect(() => {
    if (paymentStatusList) return;
    updateParam('paymentStatuses', 'NEW,IN_PROGRESS');
  }, []);

  return (
    <InfiniteScrollLayout
      onScroll={({ isLastPage, isOnBottom }) => {
        if (!isOnBottom || isLastPage || isProcessing) return;

        setPage((_page) => _page + 1);
      }}
      page={page}
      pagesCount={pagesCount || 1}
      bottomPositionOffset={248}
      isProcessing={!!(isProcessing && currentPage)}
      justifyContent="center"
      height="100%"
      width="100%"
      position="relative"
      padding="14px 14px"
      overflow="auto"
    >
      {isProcessing && !currentPage && <AbsoluteProgress />}

      {data.map((id, index) => (
        <Grid
          item
          key={id}
          xs={12}
          marginBottom={index === data.length - 1 ? 0 : 20}
        >
          <DebtorDebtsListItemContainer
            key={id}
            index={index + 1}
            debtId={id}
          />
        </Grid>
      ))}

      {!isProcessing && !data.length && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          width="100%"
        >
          <Typography fontSize={24}>
            {t('debtors.debtor_has_no_debts')}
          </Typography>
        </Box>
      )}
    </InfiniteScrollLayout>
  );
};
