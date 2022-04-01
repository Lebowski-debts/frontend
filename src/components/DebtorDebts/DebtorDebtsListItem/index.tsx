import React from 'react';

import { ApiGetDebt } from '@common/types/api/debt';

export const DebtorDebtsListItem: React.FC<ApiGetDebt> = ({
  actualSum,
  // createdAt,
  // expireDate,
  // initialSum,
  // isExpired,
  // isPaid,
  // paymentStatus,
}) => {
  return <div>{actualSum}</div>;
};
