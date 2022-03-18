import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Grid, Typography } from '@mui/material';

import { AbsoluteProgress } from '@components/AbsoluteProgress';
import { GetDebtorsPayload } from '@ducks/debtors/debtors.types';
import { DebtorsListItemContainer } from '@containers/Debtors/DebtorsListItemContainer';

export interface Props {
  ids?: number[];
  getData: (payload: GetDebtorsPayload) => void;
  isProcessing: boolean;
}

export const DebtorsList: React.FC<Props> = ({
  ids = [],
  getData,
  isProcessing,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    getData({
      userId: +(process.env.TELEGRAM_USER_ID || 0),
      page: 1,
      onPage: 5,
    });
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      // alignItems="center"
      height="100%"
      width="100%"
      position="relative"
      padding="14px 14px"
      overflow="auto"
    >
      {isProcessing && <AbsoluteProgress />}

      {ids.length ? (
        ids.map((id, index) => (
          <Grid
            item
            key={id}
            xs={12}
            marginBottom={index === ids.length - 1 ? 0 : 20}
          >
            <DebtorsListItemContainer userId={id} />
          </Grid>
        ))
      ) : (
        <Grid item margin="auto">
          <Typography fontSize={24}>{t('debtors.no_debtors_yet')}</Typography>
        </Grid>
      )}
    </Grid>
  );
};
