// src/app/store/generic.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { GenericActions } from './action';

export interface GenericState<T> {
  entities: T[];
  loaded: boolean;
  loading: boolean;
  error: string | null;
}

export const initialGenericState: GenericState<any> = {
  entities: [],
  loaded: false,
  loading: false,
  error: null,
};

export const genericReducer = createReducer(
  initialGenericState,
  on(GenericActions.load, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(GenericActions.loadSuccess, (state, { data }) => ({
    ...state,
    entities: data,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(GenericActions.loadFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
  on(GenericActions.createSuccess, (state, { entity }) => ({
    ...state,
    entities: [...state.entities, entity],
  })),
  on(GenericActions.updateSuccess, (state, { entity }) => ({
    ...state,
    entities: state.entities.map((e) => (e.id === entity.id ? entity : e)),
  })),
  on(GenericActions.deleteSuccess, (state, { id }) => ({
    ...state,
    entities: state.entities.filter((e) => e.id !== id),
  }))
);
