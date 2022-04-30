import { useHistory, useLocation } from 'react-router-dom';

export const useSearchParams = () => {
  const { search } = useLocation();
  const history = useHistory();

  const urlSearchParams = new URLSearchParams(search);

  const push = () => {
    const searchString = `?${urlSearchParams.toString()}`;

    history.push(searchString);
  };

  const updateParam = (key: string, value: string) => {
    urlSearchParams.set(key, value);
    push();
  };

  const deleteParam = (key: string) => {
    urlSearchParams.delete(key);
    push();
  };

  const getParam = (key: string) => {
    return urlSearchParams.get(key) || '';
  };

  const paramsObj: { [key: string]: string } = {};

  urlSearchParams.forEach((value, key) => {
    paramsObj[key] = value;
  });

  return {
    getParam,
    updateParam,
    deleteParam,
    paramsObj,
  };
};
