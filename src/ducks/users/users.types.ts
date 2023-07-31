import { APIUser } from '@common/types/api/user';
import { EntitiesState } from '@common/types/slices/common';

export type NormalizedUsersState = EntitiesState<APIUser>;
