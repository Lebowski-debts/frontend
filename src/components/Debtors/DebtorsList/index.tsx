import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Grid, Typography } from '@mui/material';

import { getDebtorsSlice } from '@ducks/debtors/debtors.slice';
import {
  selectGetDebtorsData,
  selectGetDebtorsIsProcessing,
} from '@ducks/debtors/debtors.selectors';
import { AbsoluteProgress } from '@components/AbsoluteProgress';

import { DebtorsListItem } from '../DebtorsListItem';

export const DebtorsList = () => {
  const isProcessing = useSelector(selectGetDebtorsIsProcessing);
  const debtorsData = useSelector(selectGetDebtorsData);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(
      getDebtorsSlice.actions.request({
        userId: +(process.env.TELEGRAM_USER_ID || 0),
        page: 1,
        onPage: 5,
      })
    );
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

      {debtorsData?.data.length ? (
        debtorsData?.data.map((debtor, index) => (
          <Grid
            item
            key={debtor.user.id}
            xs={12}
            marginBottom={index === debtorsData.data.length - 1 ? 0 : 20}
          >
            <DebtorsListItem {...debtor} />
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
