import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter } from '@ngrx/entity';
import { CrudActions } from './action';

export interface CrudState<T> extends EntityState<T> {
  loading: boolean;
  error: any | null;
}

export function createCrudReducer<T>(actions: CrudActions<T>, adapter: EntityAdapter<T>) {
  const initialState: CrudState<T> = adapter.getInitialState({
    loading: false,
    error: null,
  });

  return createReducer(
    initialState,
    on(actions.load, (state) => ({ ...state, loading: true })),
    on(actions.loadSuccess, (state, { data }) => adapter.setAll(data, { ...state, loading: false })),
    on(actions.loadFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(actions.create, (state)=>({...state , loading:true})),
    on(actions.createSuccess, (state, { data }) => adapter.addOne(data, {...state ,loading:false})),
    on(actions.createFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(actions.update, (state)=>({...state , loading:true})),
    on(actions.updateSuccess, (state, { data }) => adapter.upsertOne(data, {...state ,loading:false})),
    on(actions.updateFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(actions.delete, (state) => ({ ...state, loading: true })),
    on(actions.deleteSuccess, (state, { id }) => adapter.removeOne(id, state)),
    on(actions.deleteFailure, (state, { error }) => ({ ...state, loading: false, error })),
  );
}
