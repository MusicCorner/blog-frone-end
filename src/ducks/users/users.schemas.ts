import { schema } from 'normalizr';

import { APIUser } from '@common/types/api/user';

export const userSchema = new schema.Entity<APIUser>('user');
