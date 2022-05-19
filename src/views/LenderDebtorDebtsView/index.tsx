import React from 'react';
import { useParams } from 'react-router-dom';

import { DebtsListContainer } from '@containers/Debts/DebtsListContainer';

export const LenderDebtorDebtsView: React.FC = () => {
  const { debtorId, lenderId } =
    useParams<{ debtorId: string; lenderId: string }>();

  return <DebtsListContainer lenderId={+lenderId} debtorId={+debtorId} />;
};
