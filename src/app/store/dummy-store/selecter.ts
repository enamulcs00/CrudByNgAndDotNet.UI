import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User, userAdapter } from '.';
import { CrudState } from './reducer';


const selectUserState = createFeatureSelector<CrudState<User>>('user');
const { selectAll } = userAdapter.getSelectors();

export const selectAllUsers = createSelector(selectUserState, selectAll);
export const selectUserLoading = createSelector(selectUserState, (state) => state.loading);



// GEneric selector
export interface EntityState<T> {
    entities: T[];
    loading: boolean;
    error: string | null;
  }



// use this to make selector generic



export const selectEntityState = createFeatureSelector<EntityState<any>>('entity');

export const selectEntities = createSelector(
  selectEntityState,
  (state: EntityState<any>) => state.entities // success
);

export const selectLoading = createSelector(
  selectEntityState,
  (state: EntityState<any>) => state.loading  // loading
);

export const selectError = createSelector(
  selectEntityState,
  (state: EntityState<any>) => state.error  // failed
);

