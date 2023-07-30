import React from 'react';

import { Box } from '@mui/material';

import { PostWidget } from '@widgets/Post';

export interface Props {
  ids: string[];
}

export const PostsListWidget: React.FC<Props> = ({ ids }) => (
  <Box>
    {ids.map((id) => (
      <PostWidget id={id} key={id} />
    ))}
  </Box>
);
