import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Grid, Typography } from '@mui/material';

import { AbsoluteProgress } from '@components/AbsoluteProgress';
import { GetDebtorsPayload } from '@ducks/debtors/debtors.types';
import { DebtorsListItemContainer } from '@containers/Debtors/DebtorsListItemContainer';
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
}

export const DebtorsList: React.FC<Props> = ({
  getData,
  resetData,
  isProcessing = false,
  value,
}) => {
  const { t } = useTranslation();

  const { data, currentPage, pagesCount } = value || {};

  useEffect(() => {
    getData({
      userId: myTelegramUserId,
      page: 1,
      onPage: 5,
    });

    return () => resetData();
  }, []);

  return (
    <InfiniteScrollLayout
      isProcessing={isProcessing && !!currentPage}
      getData={(apiListParams) =>
        getData({ ...apiListParams, userId: myTelegramUserId })
      }
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
        <Grid
          item
          key={id}
          xs={12}
          marginBottom={index === data?.keys.length - 1 ? 0 : 20}
        >
          <DebtorsListItemContainer lenderId={myTelegramUserId} debtorId={id} />
        </Grid>
      ))}

      {!data?.keys.length && !isProcessing && (
        <Grid item margin="auto">
          <Typography fontSize={24}>{t('debtors.no_debtors_yet')}</Typography>
        </Grid>
      )}
    </InfiniteScrollLayout>
  );
};
