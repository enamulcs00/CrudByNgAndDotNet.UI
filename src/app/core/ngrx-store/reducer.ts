import { createReducer, on } from '@ngrx/store';
import { BaseModel } from 'src/app/shared/models/general';
import { GenericActions } from './action';
import { initialGenericState, GenericState } from './generic.state';


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
    }))
  );
}