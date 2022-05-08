import React, { useState } from 'react';

import { Drawer, DrawerProps } from '@mui/material';

import { DebtorDebtsDrawerMain } from './Main';
import { TabName } from './types';
import { DebtorDebtsDrawerFilter } from './Filter';
import { DebtorDebtsDrawerSort } from './Sort';

export const DebtorDebtsDrawer = (props: DrawerProps) => {
  const [tab, setTab] = useState<TabName | ''>('');

  const onClose = () => {
    if (props.onClose) {
      props.onClose({}, 'backdropClick');
    }

    setTimeout(() => {
      setTab('');
    }, 400);
  };

  return (
    <Drawer
      container={() => document.getElementById('root')}
      anchor="top"
      PaperProps={{
        sx: { marginTop: (theme) => theme.mixins.toolbar.minHeight },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgb(0 0 0 / 1%)',
          backdropFilter: 'blur(5px)',
        },
      }}
      {...props}
      onClose={onClose}
    >
      {!tab && <DebtorDebtsDrawerMain navigateToTab={setTab} />}

      {tab === 'FILTERS' && (
        <DebtorDebtsDrawerFilter
          onCloseDrawer={onClose}
          onClose={() => setTab('')}
        />
      )}

      {tab === 'SORTING' && (
        <DebtorDebtsDrawerSort
          onCloseDrawer={onClose}
          onClose={() => setTab('')}
        />
      )}
    </Drawer>
  );
};
