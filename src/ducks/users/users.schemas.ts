import { schema } from 'normalizr';

export const userSchema = new schema.Entity(
  'user',
  {},
  {
    idAttribute: (value: unknown & { id?: number; telegramUserId?: number }) =>
      (value.id || value.telegramUserId) as unknown as string,
  }
);
