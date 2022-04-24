import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  Autocomplete,
  TextField,
  AutocompleteProps,
  TextFieldProps,
  AutocompleteRenderInputParams,
} from '@mui/material';

import { useAppSelector } from '@common/hooks/useAppSelector';
import {
  selectIsGetUserLoading,
  selectUser,
} from '@ducks/users/users.selector';
import { getUserByIdSlice } from '@ducks/users/users.slice';

export interface Props<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> extends Omit<
    Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'options'>,
    'renderInput'
  > {
  selectedUserId?: number;
  textFieldProps?: TextFieldProps;
  options?: T[];
  rednerInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
}

export const UsersAutoComplete = <
  T,
  M extends boolean | undefined = undefined,
  D extends boolean | undefined = undefined,
  F extends boolean | undefined = undefined
>({
  textFieldProps = {},
  selectedUserId = 0,
  ...autocompleteProps
}: Props<T, M, D, F>) => {
  const { t } = useTranslation();

  const selectedUser =
    useAppSelector((state) => selectUser(state, selectedUserId)) || {};
  const isUserLoading = useAppSelector((state) =>
    selectIsGetUserLoading(state, selectedUserId)
  );

  const dispatch = useDispatch();

  const selectedUserLabel =
    selectedUser.nickname || selectedUser.telegramUserLogin || '';

  const options = [selectedUserId] as unknown as T[];

  useEffect(() => {
    if (selectedUser.createdAt || !selectedUserId) return;

    dispatch(getUserByIdSlice.actions.request({ userId: selectedUserId }));
  }, []);

  return (
    <Autocomplete
      loading={isUserLoading}
      loadingText={autocompleteProps.loadingText || t('common.loading')}
      options={options}
      renderInput={(props) => (
        <TextField {...props} color="secondary" {...textFieldProps} />
      )}
      getOptionLabel={() => selectedUserLabel}
      {...autocompleteProps}
    />
  );
};
