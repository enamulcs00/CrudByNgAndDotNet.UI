import { createReducer, on } from '@ngrx/store';
import { GenericActions } from './action';
import { initialGenericState, GenericState } from './generic.state';
import { BaseModel } from '..';


export function createGenericReducer<T extends BaseModel>(actions: GenericActions<T>) {
  return createReducer(
    initialGenericState as GenericState<T>,
    
    on(actions.load, (state) => ({
      ...state,
      loading: true,
      error: null
    })),
    
    on(actions.loadSuccess, (state, { items }) => {
      const entities = items.reduce((acc, item) => ({
        ...acc,
        [item.id]: item
      }), {} as { [key: string]: T });
      
      return {
        ...state,
        entities,
        ids: items.map(item => item.id.toString()),
        loading: false
      };
    }),
    
    on(actions.loadFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

    on(actions.loadById, (state) => ({
      ...state,
      loading: true,
      error: null
    })),

    on(actions.loadByIdSuccess, (state, { item }) => ({
      ...state,
      entities: { ...state.entities, [item.id]: item },
      loading: false
    })),

    on(actions.loadByIdFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),
    
    on(actions.createSuccess, (state, { item }) => ({
      ...state,
      entities: { ...state.entities, [item.id]: item },
      ids: [...state.ids, item.id.toString()]
    })),
    
    on(actions.updateSuccess, (state, { item }) => ({
      ...state,
      entities: { ...state.entities, [item.id]: item }
    })),
    
    on(actions.deleteSuccess, (state, { id }) => {
      const { [id]: removed, ...entities } = state.entities;
      return {
        ...state,
        entities,
        ids: state.ids.filter(itemId => itemId !== id)
      };
    }),
    
    on(actions.select, (state, { id }) => ({
      ...state,
      selectedId: id
    })),
    
    on(actions.setSearchTerm, (state, { searchTerm }) => ({
      ...state,
      searchTerm
    }))
  );
}