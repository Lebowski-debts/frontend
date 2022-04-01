import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Grid, Typography } from '@mui/material';

import { AbsoluteProgress } from '@components/AbsoluteProgress';
import { AsyncState } from '@common/store/helpers';
import { ApiListParams, PaginatedHttpSuccessResponse } from '@common/types/api';
import { LenderDebtorDebtsListItemContainer } from '@containers/LenderDebtor/LenderDebtorDebtsListItemContainer';

export interface Props
  extends AsyncState<PaginatedHttpSuccessResponse<number[]>, unknown> {
  getData: (params: ApiListParams) => void;
}

export const LenderDebtorDebtsList: React.FC<Props> = ({
  getData,
  isProcessing,
  value,
}) => {
  const { data = [] } = value || {};
  const { t } = useTranslation();

  useEffect(() => {
    getData({ page: 1 });
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      height="100%"
      width="100%"
      position="relative"
      padding="14px 14px"
      overflow="auto"
    >
      {isProcessing && <AbsoluteProgress />}

      {data.length ? (
        data.map((id, index) => (
          <Grid
            item
            key={id}
            xs={12}
            marginBottom={index === data.length - 1 ? 0 : 20}
          >
            <LenderDebtorDebtsListItemContainer
              key={id}
              index={index + 1}
              debtId={id}
            />
          </Grid>
        ))
      ) : (
        <Grid item margin="auto">
          <Typography fontSize={24}>
            {t('debtors.debtor_has_no_debts')}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
