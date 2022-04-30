import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, LinkProps, useLocation } from 'react-router-dom';

import { useTheme } from '@mui/material';

export const LocalizedLink: React.FC<LinkProps> = ({ to, ...props }) => {
  const {
    i18n: { language },
  } = useTranslation();

  const { palette } = useTheme();
  const { pathname } = useLocation();

  const url = `/${language}${to.toString()}`;

  const params = new URLSearchParams(url);
  params.set('prevRoute', pathname.replace(`/${language}`, ''));
  const searchString = `?${params.toString()}`;

  return (
    <Link
      {...props}
      style={{ ...props.style, color: palette.secondary.main }}
      to={{ pathname: url, search: searchString }}
    />
  );
};
