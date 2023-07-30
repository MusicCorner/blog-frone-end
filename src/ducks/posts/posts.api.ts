import { API_ENPOINTS } from '@common/constants/api';
import { guestApiClient } from '@common/helpers/apiClient';
import {
  APIGETPostsSuccess,
  APIGetPostsRequest,
} from '@common/types/api/posts';

export const postsApi = {
  getPosts: (params: APIGetPostsRequest) =>
    guestApiClient.get<APIGETPostsSuccess>(API_ENPOINTS.POSTS, {
      params: params as unknown as Record<string, string | number>,
    }),
};
