import React from 'react';
import { useParams } from 'react-router-dom';

import { DebtorDebtsListContainer } from '@containers/DebtorDebts/DebtorDebtsListContainer';

export const DebtorDebtsView: React.FC = () => {
  const { debtorId: _debtorId } = useParams<{ debtorId: string }>();

  const debtorId = +_debtorId;

  return <DebtorDebtsListContainer debtorId={debtorId} />;
};
