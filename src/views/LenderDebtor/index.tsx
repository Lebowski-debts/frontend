import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getLenderDebtorDebtsSlice } from '@ducks/lenderDebtor/lenderDebtor.slice';

export const LenderDebtorView: React.FC = () => {
  const { debtorId: _debtorId, lenderId: _lenderId } =
    useParams<{ debtorId: string; lenderId: string }>();
  const dispatch = useDispatch();

  const debtorId = +_debtorId;
  const lenderId = +_lenderId;

  useEffect(() => {
    dispatch(
      getLenderDebtorDebtsSlice.actions.request({ lenderId, debtorId, page: 1 })
    );
  }, [lenderId, debtorId]);

  return null;
};
