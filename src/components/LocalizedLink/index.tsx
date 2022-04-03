import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, LinkProps } from 'react-router-dom';

import { useTheme } from '@mui/material';

export const LocalizedLink: React.FC<LinkProps> = ({ to, ...props }) => {
  const {
    i18n: { language },
  } = useTranslation();

  const { palette } = useTheme();

  return (
    <Link
      {...props}
      style={{ ...props.style, color: palette.secondary.main }}
      to={`/${language}${to.toString()}`}
    />
  );
};
