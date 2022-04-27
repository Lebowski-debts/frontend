import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ArrowBackIos } from '@mui/icons-material';
import { Typography } from '@mui/material';

import { ROOT_ROUTES } from '@common/constants/routes';
import { AppLayout } from '@components/AppLayout';
import { LocalizedLink } from '@components/LocalizedLink';
import { FormData, PayTheDebtOffForm } from '@components/PayTheDebtOffForm';
import { LenderDebtorDebtsListItemContainer } from '@containers/LenderDebtor/LenderDebtorDebtsListItemContainer';
import { payTheDebtOffSlice } from '@ducks/debts/debts.slice';
import { useOnSuccess } from '@common/hooks/useOnSuccess';
import { useAppSelector } from '@common/hooks/useAppSelector';
import {
  selectIsPayTheDebtOffUploading,
  selectPayTheDebtOff,
} from '@ducks/debts/debts.selectors';
import { usePrevRoute } from '@common/hooks/usePrevRoute';

export const PayTheDebtOffView = () => {
  // TODO: fetch data for debt card in case if user reloads page
  const { t } = useTranslation();
  const { debtId } = useParams<{ debtId: string }>();
  const payTheDebtOffState = useAppSelector(selectPayTheDebtOff);
  const isUploading = useAppSelector(selectIsPayTheDebtOffUploading);

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data: FormData) => {
    dispatch(payTheDebtOffSlice.actions.request({ data, debtId: +debtId }));
  };

  useOnSuccess(() => {
    history.push(ROOT_ROUTES.DEBTORS);
  }, payTheDebtOffState);

  const prevRoute = usePrevRoute();

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
        <LenderDebtorDebtsListItemContainer
          showPayButton={false}
          debtId={+debtId}
        />
      </PayTheDebtOffForm>
    </AppLayout>
  );
};
