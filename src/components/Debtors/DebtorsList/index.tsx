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
      // alignItems="center"
      height="100%"
      width="100%"
      position="relative"
      padding="12px 10px"
      overflow="auto"
    >
      {isProcessing && <AbsoluteProgress />}

      {debtorsData?.data.length && !isProcessing ? (
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
          <Typography fontSize={24}>No debtors yet..</Typography>
        </Grid>
      )}
    </Grid>
  );
};
