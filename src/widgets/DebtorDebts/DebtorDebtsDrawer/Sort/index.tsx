import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Sort } from '@mui/icons-material';

import { useSearchParams } from '@common/hooks/useSearchParams';
import { SORT_BY_VALUES } from '@common/constants/api';
import { SortType } from '@common/types/api';
import { SortBy } from '@common/types/api/debtor';

export interface Props {
  onClose: () => void;
  onCloseDrawer: () => void;
}

export const DebtorDebtsDrawerSort = ({ onClose, onCloseDrawer }: Props) => {
  const { t } = useTranslation();
  const { getParam, updateParam } = useSearchParams();

  const initialSortBy = getParam('sortBy') as SortBy;
  const initialSortType = getParam('sortType') as SortType;

  const [sortBy, setSortBy] = useState<SortBy>(initialSortBy);
  const [sortType, setSortType] = useState<SortType>(initialSortType);

  const onSubmit = () => {
    updateParam('sortBy', sortBy);
    updateParam('sortType', sortType);

    onCloseDrawer();
  };

  const toggleSortType = () => {
    setSortType((type) => {
      if (type === 'asc') return 'desc';

      return 'asc';
    });
  };

  return (
    <Box padding={18}>
      <Box display="flex" marginBottom={40}>
        <FormControl fullWidth>
          <InputLabel
            color="secondary"
            id="debts-filter-expiration-status-select"
          >
            {t('debts_sort.sort_by')}
          </InputLabel>
          <Select
            labelId="debts-filter-expiration-status-select"
            label={t('debts_sort.sort_by')}
            variant="outlined"
            color="secondary"
            fullWidth
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            value={sortBy}
          >
            {SORT_BY_VALUES.map((value) => (
              <MenuItem key={value} value={value}>
                {t(`sort_by.${value}`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box marginLeft={10} display="flex" alignItems="center">
          <Sort
            onClick={() => toggleSortType()}
            sx={sortType === 'asc' ? { transform: 'rotateX(180deg)' } : null}
          />
        </Box>
      </Box>

      <Button
        size="large"
        fullWidth
        sx={{
          marginBottom: 12,
          marginTop: 50,
        }}
        color="primary"
        variant="contained"
        onClick={onSubmit}
      >
        {t('common.submit')}
      </Button>

      <Button
        variant="outlined"
        size="large"
        color="secondary"
        fullWidth
        onClick={onClose}
      >
        {t('common.back')}
      </Button>
    </Box>
  );
};
