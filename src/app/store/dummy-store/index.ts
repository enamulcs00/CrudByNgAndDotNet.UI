import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CrudActions } from './action';
import { createCrudReducer } from './reducer';

// Example: User
export interface User {
  id: string;
  name: string;
  email: string;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();
const userActions = new CrudActions<User>('User');
export const userReducer = createCrudReducer(userActions, userAdapter);
