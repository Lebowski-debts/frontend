import { schema } from 'normalizr';

import {
  ApiGetDebtor,
  ApiGetDebtorDebtsCommonInfo,
} from '@common/types/api/debtor';
import { userSchema } from '@ducks/users/users.schemas';

export const debtsInfoSchema = new schema.Entity(
  'debtsInfo',
  {},
  {
    idAttribute: (value: ApiGetDebtorDebtsCommonInfo, parent: ApiGetDebtor) =>
      (parent.user.id || parent.user.telegramUserId) as unknown as string,
  }
);

export const debtorsSchema = new schema.Array({
  user: userSchema,
  debtsInfo: debtsInfoSchema,
});
