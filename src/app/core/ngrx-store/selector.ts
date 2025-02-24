import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GenericState } from './generic.state';
import { BaseModel } from 'src/app/shared/models/general';

export function createGenericSelectors<T extends BaseModel>(featureName: string) {
  const getFeatureState = createFeatureSelector<GenericState<T>>(featureName);
  const selectAll = createSelector(
    getFeatureState,
    state => state.ids.map(id => state.entities[id])
  );

  const selectEntities = createSelector(
    getFeatureState,
    state => state.entities
  );

  const selectLoading = createSelector(
    getFeatureState,
    state => state.loading
  );
  const selectLoaded = createSelector(
    getFeatureState,
    state => state.loaded
  );
  const selectError = createSelector(
    getFeatureState,
    state => state.error
  );
  const selectById = (id: string) => createSelector(
    selectEntities,
    entities => entities[id]
  );
  const selectSelected = createSelector(
    getFeatureState,
    state => state.selectedId ? state.entities[state.selectedId] : null
  );

  return {
    selectAll,
    selectEntities,
    selectLoading,
    selectLoaded,
    selectById,
    selectError,
    selectSelected
  };
}