import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Box, Paper } from '@mui/material';

import { getPostsSlice } from '@ducks/posts/posts.slices';
import { useAppSelector } from '@common/hooks/useAppSelector';
import { PostsListWidget } from '@widgets/PostsList';

export const HomeView = () => {
  const dispatch = useDispatch();
  const { value } = useAppSelector(getPostsSlice.selectors.asyncState);

  const { data = [] } = value || {};

  useEffect(() => {
    dispatch(getPostsSlice.actions.request());
  }, []);

  return (
    <Box>
      <Paper>
        <PostsListWidget ids={data || []} />
      </Paper>
    </Box>
  );
};
