import React from 'react';

import { Avatar as MaterialAvatar, AvatarProps } from '@mui/material';

export interface Props extends AvatarProps {
  userName?: string | number;
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0] || 'a'}`.toLocaleUpperCase(),
  };
}

export const Avatar: React.FC<Props> = (props) => {
  const { userName: _userName, ...avatar } = props;
  const userName = `${_userName || ''}`;

  let finalProps = {
    ...avatar,
  };

  if (userName) {
    const stringAvatarProps = stringAvatar(userName);
    finalProps = {
      ...avatar,
      sx: {
        ...stringAvatarProps.sx,
        ...avatar.sx,
      },
      children: avatar.children || stringAvatarProps.children,
    };
  }
  return <MaterialAvatar {...finalProps} />;
};
