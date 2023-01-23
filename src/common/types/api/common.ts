export enum APISort {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type APISortLiteral = `${APISort}`;

export enum APIDefaultSortBy {
  CREATED_AT = 'createdAt',
  EDITED_AT = 'editedAt',
}

export interface APIPaginationPayload<S = APIDefaultSortBy> {
  page: number;
  onPage: number;
  sort: APISortLiteral;
  sortBy: S;
}

export interface APIError {
  status: number;
  message: string;
}
