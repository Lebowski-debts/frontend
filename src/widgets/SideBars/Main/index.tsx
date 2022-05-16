import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Box, Drawer, DrawerProps, List, Typography } from '@mui/material';

import { Avatar } from '@components/Avatar';
import { getUserByIdSlice } from '@ducks/users/users.slice';
import { useAppSelector } from '@common/hooks/useAppSelector';
import {
  selectIsGetUserLoading,
  selectUser,
} from '@ducks/users/users.selector';
import { AbsoluteProgress } from '@components/AbsoluteProgress';
import { ROOT_ROUTES } from '@common/constants/routes';

import { NavigationListItem } from './NavigationListItem';

const userId = process.env.TELEGRAM_USER_ID as unknown as number;

const routes = [ROOT_ROUTES.DEBTORS, ROOT_ROUTES.LENDERS, ROOT_ROUTES.SETTINGS];

export const MainSideBar = (props: DrawerProps) => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => selectUser(state, userId)) || {};
  const isUserProcessing = useAppSelector((state) =>
    selectIsGetUserLoading(state, userId)
  );

  useEffect(() => {
    dispatch(getUserByIdSlice.actions.request({ userId }));
  }, []);

  return (
    <Drawer anchor="left" {...props}>
      <Box
        position="relative"
        height="100%"
        width="100%"
        padding={20}
        paddingRight={40}
        sx={{ background: (theme) => theme.palette.background.default }}
      >
        {isUserProcessing ? (
          <AbsoluteProgress />
        ) : (
          <>
            <Box display="flex" alignItems="center" marginBottom={60}>
              <Avatar
                userName={user.nickname || user.telegramUserLogin}
                sx={{ height: 60, width: 60, fontSize: 24 }}
              />

              <Box marginLeft={10}>
                <Typography variant="h6" color="secondary">
                  {user.nickname || user.telegramUserLogin}
                </Typography>

                <Typography variant="caption">Your full name</Typography>
              </Box>
            </Box>

            <Box>
              <List>
                {routes.map((route) => (
                  <NavigationListItem
                    key={route}
                    onCloseDarwer={() => {
                      if (!props.onClose) return;
                      props.onClose({}, 'backdropClick');
                    }}
                    route={route}
                  />
                ))}
              </List>
            </Box>

            <Box position="absolute" bottom={10}>
              <NavigationListItem
                onCloseDarwer={() => {
                  if (!props.onClose) return;
                  props.onClose({}, 'backdropClick');
                }}
                route={ROOT_ROUTES.LOGOUT}
              />
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};
