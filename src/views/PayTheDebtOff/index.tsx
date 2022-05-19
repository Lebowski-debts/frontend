import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { FormData, PayTheDebtOffForm } from '@widgets/PayTheDebtOffForm';
import { DebtsListItemContainer } from '@containers/Debts/DebtsListItemContainer';
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
    <PayTheDebtOffForm
      onSubmit={onSubmit}
      isProcessing={false}
      isUploading={isUploading}
    >
      <DebtsListItemContainer showPayButton={false} debtId={+debtId} />
    </PayTheDebtOffForm>
  );
};
