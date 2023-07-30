import { useEffect } from 'react';

import { PartialAsyncState } from 'create-async-slice';

import { RootState } from '@store';

import { useAppSelector } from './useAppSelector';

export type AsyncSliceSelector = (
  state: RootState
) => PartialAsyncState<unknown, unknown>;

export const useOnSuccessResponse = (
  asyncSliceSelector: AsyncSliceSelector,
  callBack: () => void
) => {
  const { isSuccess } = useAppSelector(asyncSliceSelector);

  useEffect(() => {
    if (!isSuccess) return;

    callBack();
  }, [isSuccess]);
};
