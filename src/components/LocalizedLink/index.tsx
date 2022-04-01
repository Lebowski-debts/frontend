import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, LinkProps } from 'react-router-dom';

export const LocalizedLink: React.FC<LinkProps> = ({ to, ...props }) => {
  const {
    i18n: { language },
  } = useTranslation();

  return <Link {...props} to={`/${language}${to.toString()}`} />;
};
