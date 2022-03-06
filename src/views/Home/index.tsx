import React from 'react';
import { Link } from 'react-router-dom';

import { ROOT_ROUTES } from '@common/constants/routes';

export const HomeView = () => (
  <Link to={ROOT_ROUTES.DEBTORS}>Список моих должников</Link>
);
