import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ArrowBackIos } from '@mui/icons-material';
import { Typography } from '@mui/material';

import { AppLayout } from '@components/AppLayout';
import { LocalizedLink } from '@components/LocalizedLink';
import { FormData, PayTheDebtOffForm } from '@widgets/PayTheDebtOffForm';
import { DebtorDebtsListItemContainer } from '@containers/DebtorDebts/DebtorDebtsListItemContainer';
import { payTheDebtOffSlice } from '@ducks/debts/debts.slice';
import { useOnSuccess } from '@common/hooks/useOnSuccess';
import { useAppSelector } from '@common/hooks/useAppSelector';
import {
  selectIsPayTheDebtOffUploading,
  selectPayTheDebtOff,
} from '@ducks/debts/debts.selectors';
import { usePrevRoute } from '@common/hooks/usePrevRoute';
import { useLocalizedHistoryPush } from '@common/hooks/useLocalizedHistoryPush';

export const PayTheDebtOffView = () => {
  // TODO: fetch data for debt card in case if user reloads page
  const { t } = useTranslation();
  const { debtId } = useParams<{ debtId: string }>();
  const payTheDebtOffState = useAppSelector(selectPayTheDebtOff);
  const isUploading = useAppSelector(selectIsPayTheDebtOffUploading);

  const prevRoute = usePrevRoute();

  const dispatch = useDispatch();
  const historyPush = useLocalizedHistoryPush();

  const onSubmit = (data: FormData) => {
    dispatch(payTheDebtOffSlice.actions.request({ data, debtId: +debtId }));
  };

  useOnSuccess(() => {
    historyPush(prevRoute);
  }, payTheDebtOffState);

  return (
    <AppLayout
      headerProps={{
        leftButton: (
          <LocalizedLink style={{ height: 24 }} to={prevRoute}>
            <ArrowBackIos />
          </LocalizedLink>
        ),
        rightButton: <div />,
        children: (
          <Typography fontSize={20}>
            {t('pay_the_debt_off.pay_the_debt_off_form_title')}
          </Typography>
        ),
      }}
    >
      <PayTheDebtOffForm
        onSubmit={onSubmit}
        isProcessing={false}
        isUploading={isUploading}
      >
        <DebtorDebtsListItemContainer showPayButton={false} debtId={+debtId} />
      </PayTheDebtOffForm>
    </AppLayout>
  );
};
