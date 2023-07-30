import React from 'react';

import { Card, CardContent, Typography } from '@mui/material';

import { useAppSelector } from '@common/hooks/useAppSelector';
import { selectPost } from '@ducks/posts/posts.selectors';

export interface Props {
  id: string;
}

export const PostWidget: React.FC<Props> = ({ id }) => {
  const { content, title } = useAppSelector((state) =>
    selectPost(state, { id })
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body1">{content}</Typography>
      </CardContent>
    </Card>
  );
};
