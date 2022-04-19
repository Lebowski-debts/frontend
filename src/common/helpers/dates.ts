import dayjs, { Dayjs } from 'dayjs';

import { YEAR_MONTH_DAY } from '@common/constants/dateFormats';

export const formatDate = (
  date: string | Date | Dayjs,
  format = YEAR_MONTH_DAY
) => dayjs(date).format(format);
