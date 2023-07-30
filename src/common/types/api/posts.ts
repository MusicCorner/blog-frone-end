import { APIListResponse, PartialAPIPaginationPayload } from './common';
import { APIUser } from './user';

export interface APICreatePost {
  title: string;
  content: string;
}

export type APIDeletePost = string;

export interface APIEditPost extends APICreatePost {
  id: string;
}

export interface APIGetPostsRequest extends PartialAPIPaginationPayload {
  userId?: string;
  keywords?: string;
}

export interface APIGetPostSuccess {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  likes: number;
  dislikes: number;
  user: APIUser;
}

export type APIGETPostsSuccess = APIListResponse<APIGetPostSuccess>;
