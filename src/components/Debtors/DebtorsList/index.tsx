import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
      alignItems="center"
      height="100%"
      width="100%"
      position="relative"
    >
      {isProcessing && <AbsoluteProgress />}

      {debtorsData?.data.length && !isProcessing ? (
        debtorsData?.data.map((debtor) => (
          <DebtorsListItem key={debtor.user.id} {...debtor} />
        ))
      ) : (
        <Grid item>
          <Typography fontSize={24}>No debtors yet..</Typography>
        </Grid>
      )}
    </Grid>
  );
};
