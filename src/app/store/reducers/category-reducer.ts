import { Action } from '../actions';
import {CATEGORY_ADD, CATEGORY_DELETE, CATEGORY_LIST_ERROR, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_UPDATE} from '../actions/category-action';
import {StoreUtility} from '../utils/store-utility';
import {createSelector} from '@ngrx/store';

export interface CategoryReducerState {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  entities: { [id: string]: any };
  ids: string[];
}

const initialState: CategoryReducerState = {
  loaded: false,
  loading: false,
  error: false,
  entities: {},
  ids: []
};

export function CategoryReducer(state = initialState, action: Action): CategoryReducerState {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST: {
      return {...state, loading: true};
    }
    case CATEGORY_DELETE: {
      const id = action.payload.id;
      const newIds = state.ids.filter(elem => elem !== id);
      const newEntities = StoreUtility.removeKey(state.entities, id);
      return {...state, ...{entities: newEntities, ids: newIds}};
    }
    case CATEGORY_UPDATE: {
      const category = action.payload.data;
      const entity = {[category.id]: category};
      const updatedEntities = {...state.entities, ...entity};
      return {...state, ...{entities: updatedEntities}};
    }
    case CATEGORY_ADD: {
      const category = action.payload.data;
      const entity = {[category.id]: category};
      const newEntities = {...state.entities, ...entity};
      const newIds = StoreUtility.filterDuplicateIds([...state.ids, category.id]);
      return {...state, ...{entities: newEntities, ids: newIds}};

    }
    case CATEGORY_LIST_ERROR: {
      return {...state, error: true, loading: false};
    }
    case CATEGORY_LIST_SUCCESS: {
      const categories = action.payload.data;
      const obj = StoreUtility.normalize(categories);
      const newEntities = {...state.entities, ...obj};
      const ids = categories.map((category:any) => category.id);
      const newIds = StoreUtility.filterDuplicateIds([...state.ids, ...ids]);
      return {
        ...state, ...{
          loaded: true,
          loading: false, error: false,
          entities: newEntities, ids: newIds
        }
      };
    }
    default: {
      return state;
    }
  }
}

// selectors
export const getLoading = (state: CategoryReducerState) => state.loading;
export const getLoaded = (state: CategoryReducerState) => state.loaded;
export const getEntities = (state: CategoryReducerState) => state.entities;
export const getIds = (state: CategoryReducerState) => state.ids;
export const getCategories = createSelector(getEntities,
  (entities) => StoreUtility.unNormalized(entities));
export const getError = (state: CategoryReducerState) => state.error;

