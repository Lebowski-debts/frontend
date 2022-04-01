import React from 'react';
import { useParams } from 'react-router-dom';

import { LenderDebtorDebtsListContainer } from '@containers/LenderDebtor/LenderDebtorDebtsListContainer';

export const LenderDebtorView: React.FC = () => {
  const { debtorId: _debtorId, lenderId: _lenderId } =
    useParams<{ debtorId: string; lenderId: string }>();

  const debtorId = +_debtorId;
  const lenderId = +_lenderId;

  return (
    <LenderDebtorDebtsListContainer debtorId={debtorId} lenderId={lenderId} />
  );
};
