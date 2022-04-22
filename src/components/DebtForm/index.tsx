import React from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';

import {
  Autocomplete,
  Box,
  Grid,
  Paper,
  TextField,
  useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';

import { ApiCreateDebt } from '@common/types/api/debt';
import { AbsoluteProgress } from '@components/AbsoluteProgress';

export type FormData = Omit<Omit<ApiCreateDebt, 'lenderId'>, 'debtorId'> & {
  debtorId: null | number;
};
export interface Props {
  isUploading?: boolean;
  isProcessing?: boolean;
  onSubmit: (data: FormData) => void;
  defaultFormData?: FormData;
}

export const DebtForm: React.FC<Props> = ({
  isUploading = false,
  isProcessing = false,
  onSubmit,
  defaultFormData,
}) => {
  const { t } = useTranslation();
  const { palette } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormData || {
      debtorId: null,
      sum: 0,
      expireDate: dayjs().toISOString(),
      comment: '',
    },
  });

  return (
    <form style={{ height: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        justifyContent="center"
        height="100%"
        width="100%"
        position="relative"
        padding={14}
        overflow="auto"
      >
        <Paper sx={{ padding: 14, height: 330 }}>
          <Grid container spacing={20}>
            <Grid item xs={12}>
              <Autocomplete
                options={[]}
                renderInput={(props) => (
                  <Controller
                    control={control}
                    name="debtorId"
                    rules={{ required: t('errors.required_field') as string }}
                    render={({ field }) => (
                      <TextField
                        {...props}
                        {...field}
                        error={!!errors.debtorId}
                        helperText={errors.debtorId?.message}
                        // required
                        color="secondary"
                        label={t('debt_form.debtor_field_label')}
                        fullWidth
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                control={control}
                name="sum"
                rules={{
                  required: t('errors.required_field') as string,
                  min: {
                    value: 1,
                    message: t('debt_form.sum_should_be_greater'),
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors.sum}
                    helperText={errors.sum?.message}
                    type="number"
                    color="secondary"
                    label={t('debt_form.sum_field_label')}
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                control={control}
                name="expireDate"
                rules={{ required: t('errors.required_field') as string }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    value={dayjs()}
                    onChange={() => {}}
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        error={!!errors.expireDate}
                        helperText={errors.expireDate?.message}
                        required
                        color="secondary"
                        label={t('debt_form.expiration_field_label')}
                        fullWidth
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name="comment"
                render={({ field }) => (
                  <TextField
                    {...field}
                    color="secondary"
                    label={t('debt_form.comment_field_label')}
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
        </Paper>

        <Box
          position="absolute"
          bottom={14}
          width="100%"
          left={0}
          padding="0 14px"
        >
          <LoadingButton
            loading={isUploading}
            loadingPosition="start"
            type="submit"
            size="large"
            fullWidth
            sx={{ background: palette.primary.light, color: 'white' }}
          >
            {t('common.submit')}
          </LoadingButton>
        </Box>

        {isProcessing && <AbsoluteProgress />}
      </Grid>
    </form>
  );
};
