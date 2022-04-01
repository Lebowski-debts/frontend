import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Grid, Typography } from '@mui/material';

import { AbsoluteProgress } from '@components/AbsoluteProgress';
// import { DebtorDebtsListItemContainer } from '@containers/DebtorDebts/DebtorDebtsListItemContainer';

export interface Props {
  isProcessing: boolean;
  ids: number[];
  getData: () => void;
}

export const DebtorDebtsList: React.FC<Props> = ({
  getData,
  ids,
  isProcessing,
}) => {
  useEffect(() => {
    getData();
  }, []);

  const { t } = useTranslation();

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

      {!ids.length ? (
        ids.map((id, index) => (
          <Grid
            item
            key={id}
            xs={12}
            marginBottom={index === ids.length - 1 ? 0 : 20}
          >
            {/* <DebtorDebtsListItemContainer debtId={id} /> */}
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
