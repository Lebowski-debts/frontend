import { useLocation } from 'react-router-dom';

export const usePrevRoute = () => {
  const { search } = useLocation();

  return new URLSearchParams(search).get('prevRoute') || '';
};
