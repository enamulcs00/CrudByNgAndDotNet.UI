import { Action } from '../actions';
import {REGISTERED_ERROR, REGISTERED_SUCCESS, REGISTERED_USER_ADD, REGISTERED_USER_DELETE, REGISTERED_USER_LIST, REGISTERED_USER_UPDATE, USER_ADD, USER_DELETE, USER_LIST_ERROR, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_UPDATE} from '../actions/user-action';
import {StoreUtility} from '../utils/store-utility';
import {createSelector} from '@ngrx/store';

export interface UserReducerState {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  entities: { [id: string]: any };
  ids: string[];
}

const initialState: UserReducerState = {
  loaded: false,
  loading: false,
  error: false,
  entities: {},
  ids: []
};

export function UserReducer(state = initialState, action: Action): UserReducerState {
  switch (action.type) {
    case USER_LIST_REQUEST: {
      return {...state, loading: true};
    }
    case USER_DELETE: {
      const id = action.payload.id;
      const newIds = state.ids.filter(elem => elem !== id);
      const newEntities = StoreUtility.removeKey(state.entities, id);
      return {...state, ...{entities: newEntities, ids: newIds}};
    }
    case USER_UPDATE: {
      const user = action.payload.data;
      const entity = {[user.id]: user};
      const updatedEntities = {...state.entities, ...entity};
      return {...state, ...{entities: updatedEntities}};
    }
    case USER_ADD: {
      const user = action.payload.data;
      const entity = {[user.id]: user};
      const newEntities = {...state.entities, ...entity};
      const newIds = StoreUtility.filterDuplicateIds([...state.ids, user.id]);
      return {...state, ...{entities: newEntities, ids: newIds}};

    }
    case USER_LIST_ERROR: {
      return {...state, error: true, loading: false};
    }
    case USER_LIST_SUCCESS: {
      const users = action.payload.data;
      const obj = StoreUtility.normalize(users);
      const newEntities = {...state.entities, ...obj};
      const ids = users.map((user:any) => user.id);
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
export const getLoading = (state: UserReducerState) => state.loading;
export const getLoaded = (state: UserReducerState) => state.loaded;
export const getEntities = (state: UserReducerState) => state.entities;
export const getIds = (state: UserReducerState) => state.ids;
export const getUsers = createSelector(getEntities,
  (entities) => StoreUtility.unNormalized(entities));
export const getError = (state: UserReducerState) => state.error;

// Registered user Reducer


export interface RegisteredUserReducerState {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  entities: { [id: string]: any };
  ids: string[];
}

const registeredUserinitialState: RegisteredUserReducerState = {
  loaded: false,
  loading: false,
  error: false,
  entities: {},
  ids: []
};

export function RegisteredUserReducer(state = registeredUserinitialState, action: Action): RegisteredUserReducerState {
  switch (action.type) {
    case REGISTERED_USER_LIST: {
      return {...state, loading: true};
    }
    case REGISTERED_USER_DELETE: {
      const id = action.payload.id;
      const newIds = state.ids.filter(elem => elem !== id);
      const newEntities = StoreUtility.removeKey(state.entities, id);
      return {...state, ...{entities: newEntities, ids: newIds}};
    }
    case REGISTERED_USER_UPDATE: {
      const user = action.payload.data;
      const entity = {[user.id]: user};
      const updatedEntities = {...state.entities, ...entity};
      return {...state, ...{entities: updatedEntities}};
    }
    case REGISTERED_USER_ADD: {
      const user = action.payload.data;
      const entity = {[user.id]: user};
      const newEntities = {...state.entities, ...entity};
      const newIds = StoreUtility.filterDuplicateIds([...state.ids, user.id]);
      return {...state, ...{entities: newEntities, ids: newIds}};

    }
    case REGISTERED_ERROR: {
      return {...state, error: true, loading: false};
    }
    case REGISTERED_SUCCESS: {
      const users = action.payload.data;
      const obj = StoreUtility.normalize(users);
      const newEntities = {...state.entities, ...obj};
      const ids = users.map((user:any) => user.id);
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
export const findLoading = (state: RegisteredUserReducerState) => state.loading;
export const findLoaded = (state: RegisteredUserReducerState) => state.loaded;
export const findEntities = (state: RegisteredUserReducerState) => state.entities;
export const findIds = (state: RegisteredUserReducerState) => state.ids;
export const getRegisteredUsers = createSelector(findEntities,
  (entities) => StoreUtility.unNormalized(entities));
export const getRegistergError = (state: RegisteredUserReducerState) => state.error;