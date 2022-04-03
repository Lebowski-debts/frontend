import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

export interface HistoryPath {
  hash?: string;
  key?: string;
  pathname?: string;
  search?: string;
  state?: any;
}

const isPathObject = (path: string | HistoryPath): path is HistoryPath =>
  !!(path as HistoryPath).pathname ||
  !!(path as HistoryPath).hash ||
  !!(path as HistoryPath).key ||
  !!(path as HistoryPath).state;

export const useLocalizedHistoryPush = (
  path: HistoryPath | string,
  state?: any
) => {
  const history = useHistory();
  const {
    i18n: { language },
  } = useTranslation();

  if (isPathObject(path)) {
    path.pathname = `${language}${path.pathname || ''}`;

    return history.push(path as unknown as string, state);
  }

  return history.push(`/${language}${path}`, state);
};
