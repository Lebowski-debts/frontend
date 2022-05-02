import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Button, Chip, TextField, Typography } from '@mui/material';
import {
  DateRangePicker,
  DateRange,
} from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';

import { PaymentStatus } from '@common/types/api/debtor';
import { useSearchParams } from '@common/hooks/useSearchParams';

export interface Props {
  onClose: () => void;
  onCloseDrawer: () => void;
}

export const DebtorDebtsDrawerFilter = ({ onClose, onCloseDrawer }: Props) => {
  const { t } = useTranslation();
  const { getParam, updateParam } = useSearchParams();
  const initialStatuses = getParam('status').split(',') as PaymentStatus[];
  const [statuses, setStatuses] = useState<PaymentStatus[]>(initialStatuses);
  const [dates, setDates] = useState<DateRange<Dayjs>>([null, null]);
  const [expirationFrom, expirationTo] = dates;

  const onSubmit = () => {
    updateParam('status', statuses.join(','));
    updateParam('expirationFrom', expirationFrom?.toISOString() || '');
    updateParam('expirationTo', expirationTo?.toISOString() || '');

    onCloseDrawer();
  };

  const isSelected = (status: PaymentStatus) => statuses.includes(status);

  const toggleStatus = (status: PaymentStatus) => {
    if (isSelected(status)) {
      setStatuses((actualStatuses) =>
        actualStatuses.filter((item) => item !== status)
      );

      return;
    }

    setStatuses((actualStatuses) => [...actualStatuses, status]);
  };

  return (
    <Box padding={18}>
      <Box marginBottom={40}>
        <Typography fontSize={16} marginBottom={10}>
          {t('debts_filter.status')}
        </Typography>
        <Box display="flex">
          {(['NEW', 'IN_PROGRESS', 'PAID'] as PaymentStatus[]).map((status) => (
            <Chip
              sx={{ ':not(:last-child)': { marginRight: 10 } }}
              key={status}
              color="secondary"
              variant={isSelected(status) ? 'filled' : 'outlined'}
              onClick={() => toggleStatus(status)}
              label={t(`debt_status.${status.toLowerCase()}`)}
            />
          ))}
        </Box>
      </Box>

      <Box marginBottom={20}>
        <Typography fontSize={16} marginBottom={10}>
          {t('debts_filter.expiration_date')}
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            DialogProps={{ sx: { '.MuiButton-root': { color: 'white' } } }}
            startText={t('debts_filter.expiration_from')}
            endText={t('debts_filter.expiration_to')}
            value={dates}
            onChange={(newValue: DateRange<Dayjs>) => {
              setDates(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} fullWidth />
                <TextField {...endProps} fullWidth sx={{ marginLeft: 20 }} />
              </>
            )}
          />
        </LocalizationProvider>
      </Box>

      <Button
        size="large"
        fullWidth
        sx={{
          background: (theme) => theme.palette.primary.light,
          color: 'white',
          marginBottom: 12,
          marginTop: 50,
        }}
        onClick={onSubmit}
      >
        {t('common.submit')}
      </Button>

      <Button
        variant="outlined"
        size="large"
        fullWidth
        sx={{
          color: 'white',
          borderColor: (theme) => theme.palette.primary.light,
        }}
        onClick={onClose}
      >
        {t('common.back')}
      </Button>
    </Box>
  );
};
