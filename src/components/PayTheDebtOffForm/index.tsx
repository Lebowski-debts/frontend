import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { LoadingButton } from '@mui/lab';
import { Box, Grid, Paper, TextField, useTheme } from '@mui/material';

import { ApiPayTheDebtOff } from '@common/types/api/debt';
import { AbsoluteProgress } from '@components/AbsoluteProgress';

export type FormData = Partial<ApiPayTheDebtOff>;

export interface Props {
  isUploading?: boolean;
  isProcessing?: boolean;
  onSubmit: (data: FormData) => void;
  defaultFormData?: FormData;
}

export const PayTheDebtOffForm: React.FC<Props> = ({
  isUploading,
  isProcessing,
  onSubmit,
  defaultFormData,
  children = null,
}) => {
  const { t } = useTranslation();
  const { palette } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormData || {
      paidSum: 0,
    },
  });

  return (
    <form style={{ height: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        display="block"
        height="100%"
        width="100%"
        position="relative"
        padding={14}
        overflow="auto"
      >
        {children}
        <Paper sx={{ padding: 16, height: 130, marginTop: children ? 20 : 0 }}>
          <Grid container spacing={20}>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="paidSum"
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
                    error={!!errors.paidSum}
                    helperText={errors.paidSum?.message}
                    type="number"
                    color="secondary"
                    label={t('debt_form.sum_field_label')}
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
            startIcon={<></>}
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
