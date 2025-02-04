import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GenericState } from 'src/app/shared/models/general';

export const selectGenericState = createFeatureSelector<GenericState<any>>('generic');

export const selectEntities = createSelector(
  selectGenericState,
  (state: GenericState<any>) => state.entities
);

export const selectEntityLoaded = createSelector(
  selectGenericState,
  (state: GenericState<any>) => state.loaded
);

export const selectEntityLoading = createSelector(
  selectGenericState,
  (state: GenericState<any>) => state.loading
);

export const selectEntityError = createSelector(
  selectGenericState,
  (state: GenericState<any>) => state.error
);
