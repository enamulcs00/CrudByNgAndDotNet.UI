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
  const selectSearchTerm = createSelector(
    getFeatureState,
    state => state.searchTerm
  );
  const selectById = (id: string) => createSelector(
    selectEntities,
    entities => entities[id]
  );
  const selectSelected = createSelector(
    getFeatureState,
    state => state.selectedId ? state.entities[state.selectedId] : null
  );
  const selectSearchResults = createSelector(
    selectAll,
    selectSearchTerm,
    (items, searchTerm) => {
      if (!searchTerm) return items;
      
      const lowerSearchTerm = searchTerm.toLowerCase();
      return items.filter(item => {
        // Search through all string and number properties
        return Object.entries(item).some(([key, value]) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(lowerSearchTerm);
          }
          if (typeof value === 'number') {
            return value.toString().includes(lowerSearchTerm);
          }
          return false;
        });
      });
    }
  );
  return {
    selectAll,
    selectEntities,
    selectLoading,
    selectLoaded,
    selectById,
    selectError,
    selectSelected,
    selectSearchTerm,
    selectSearchResults
  };
}