import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';

import { useAppSelector } from '@common/hooks/useAppSelector';
import { ApiCreateDebt } from '@common/types/api/debt';
import { DebtForm, FormData } from '@components/DebtForm';
import {
  selectCreateDebtState,
  selectIsCreateDebtUploading,
} from '@ducks/debts/debts.selectors';
import { createDebtSlice } from '@ducks/debts/debts.slice';
import { useOnSuccess } from '@common/hooks/useOnSuccess';
import { ROOT_ROUTES } from '@common/constants/routes';
import { LocalizedLink } from '@components/LocalizedLink';
import { AppLayout } from '@components/AppLayout';

export const CreateDebtorDebtView: React.FC = () => {
  const { debtorId } = useParams<{ debtorId: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
    history.push(ROOT_ROUTES.HOME);
  }, createDebtState);

  return (
    <AppLayout
      headerProps={{
        leftButton: (
          <LocalizedLink style={{ height: 24 }} to={ROOT_ROUTES.DEBTORS}>
            <ArrowBackIos />
          </LocalizedLink>
        ),
        rightButton: <div />,
        children: (
          <Typography fontSize={20}>
            {t('debt_form.create_new_debt')}
          </Typography>
        ),
      }}
    >
      <DebtForm
        defaultFormData={{
          debtorId: +debtorId,
          sum: 0,
          expireDate: dayjs().toISOString(),
        }}
        onSubmit={onSubmit}
        isUploading={isUploading}
      />
    </AppLayout>
  );
};
