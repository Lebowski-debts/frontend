import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ArrowBackIos } from '@mui/icons-material';
import { Typography } from '@mui/material';

import { ROOT_ROUTES } from '@common/constants/routes';
import { AppLayout } from '@components/AppLayout';
import { LocalizedLink } from '@components/LocalizedLink';
import { FormData, PayTheDebtOffForm } from '@components/PayTheDebtOffForm';
import { LenderDebtorDebtsListItemContainer } from '@containers/LenderDebtor/LenderDebtorDebtsListItemContainer';

export const PayTheDebtOffView = () => {
  // TODO: fetch data for debt card in case if user reloads page
  const { t } = useTranslation();
  const { debtId } = useParams<{ debtId: string }>();

  const onSubmit = (data: FormData) => {
    data.isFullPayment = false;
  };

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
            {t('pay_the_debt_off.pay_the_debt_off_form_title')}
          </Typography>
        ),
      }}
    >
      <PayTheDebtOffForm
        onSubmit={onSubmit}
        isProcessing={false}
        isUploading={false}
      >
        <LenderDebtorDebtsListItemContainer
          showPayButton={false}
          debtId={+debtId}
        />
      </PayTheDebtOffForm>
    </AppLayout>
  );
};
