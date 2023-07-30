import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@common/constants/routes';

import {
  AsyncSliceSelector,
  useOnSuccessResponse,
} from './useOnSuccessResponse';

export const useOnSuccessAuth = (selector: AsyncSliceSelector) => {
  const navigate = useNavigate();

  useOnSuccessResponse(selector, () => {
    navigate(`/${ROUTES.HOME}`);
  });
};
