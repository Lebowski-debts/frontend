import React from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';

import { ArrowBackIos } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { ROOT_ROUTES } from '@common/constants/routes';
import { AppLayout } from '@components/AppLayout';
import { LocalizedLink } from '@components/LocalizedLink';

export interface Props {
  title: string;
}

export const DebtForm: React.FC<Props> = ({ title }) => {
  const { t } = useTranslation();
  const { palette } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      debtorId: null,
      sum: 0,
      expiration_date: dayjs().toISOString(),
      comment: '',
    },
  });

  const onSubmit = () => {};

  return (
    <AppLayout
      headerProps={{
        leftButton: (
          <LocalizedLink style={{ height: 24 }} to={ROOT_ROUTES.DEBTORS}>
            <ArrowBackIos />
          </LocalizedLink>
        ),
        rightButton: <div />,
        children: <Typography fontSize={20}>{title}</Typography>,
      }}
    >
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
                  name="expiration_date"
                  rules={{ required: t('errors.required_field') as string }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      value={dayjs()}
                      onChange={() => {}}
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          error={!!errors.expiration_date}
                          helperText={errors.expiration_date?.message}
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
            <Button
              type="submit"
              size="large"
              fullWidth
              sx={{ background: palette.primary.light, color: 'white' }}
            >
              {t('common.submit')}
            </Button>
          </Box>
        </Grid>
      </form>
    </AppLayout>
  );
};
