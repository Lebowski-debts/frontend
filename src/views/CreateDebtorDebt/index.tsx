import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import dayjs from 'dayjs';

import { useAppSelector } from '@common/hooks/useAppSelector';
import { ApiCreateDebt } from '@common/types/api/debt';
import { DebtForm, FormData } from '@widgets/DebtForm';
import {
  selectCreateDebtState,
  selectIsCreateDebtUploading,
} from '@ducks/debts/debts.selectors';
import { createDebtSlice } from '@ducks/debts/debts.slice';
import { useOnSuccess } from '@common/hooks/useOnSuccess';
import { usePrevRoute } from '@common/hooks/usePrevRoute';
import { useLocalizedHistoryPush } from '@common/hooks/useLocalizedHistoryPush';

export const CreateDebtorDebtView: React.FC = () => {
  const { debtorId } = useParams<{ debtorId: string }>();
  const dispatch = useDispatch();

  const historyPush = useLocalizedHistoryPush();
  const prevRoute = usePrevRoute();

  const createDebtState = useAppSelector(selectCreateDebtState);
  const isUploading = useAppSelector(selectIsCreateDebtUploading);

  const onSubmit = (formData: FormData) => {
    const data: ApiCreateDebt = {
      ...formData,
      lenderId: +(process.env.TELEGRAM_USER_ID as unknown as number),
      debtorId: +(formData.debtorId || 0),
      sum: +formData.sum,
    };

    dispatch(createDebtSlice.actions.request(data));
  };

  useOnSuccess(() => {
    historyPush(prevRoute);
  }, createDebtState);

  return (
    <DebtForm
      defaultFormData={{
        debtorId: +debtorId,
        sum: 0,
        expireDate: dayjs().toISOString(),
      }}
      onSubmit={onSubmit}
      isUploading={isUploading}
    />
  );
};
