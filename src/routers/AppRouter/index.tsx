import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AppLayout } from '@components/AppLayout';
import { ContentRouter } from '@routers/ContentRouter';
import { HeaderRouter } from '@routers/HeaderRouter';

export const AppRouter: React.FC = () => {
  const match = useRouteMatch<{ locale: string }>();
  const {
    params: { locale },
  } = match;
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <AppLayout header={<HeaderRouter />}>
      <ContentRouter />
    </AppLayout>
  );
};
