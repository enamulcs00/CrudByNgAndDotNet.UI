// src/app/store/index.ts
import { ActionReducerMap } from '@ngrx/store';
import { GenericState, genericReducer } from './reducer';

export interface AppState {
  categories: GenericState<any>;
  products: GenericState<any>;
  students: GenericState<any>;
  users: GenericState<any>;
}

export const reducers: ActionReducerMap<AppState> = {
  categories: genericReducer,
  products: genericReducer,
  students: genericReducer,
  users: genericReducer,
};
