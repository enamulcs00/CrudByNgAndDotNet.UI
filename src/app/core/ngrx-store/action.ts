import { createAction, props } from '@ngrx/store';
import { BaseModel } from 'src/app/shared/models/general';

export interface GenericActions<T extends BaseModel> {
  load: ReturnType<typeof createAction>;
  loadSuccess: ReturnType<typeof createAction<string, { items: T[] }>>;
  loadFailure: ReturnType<typeof createAction<string, { error: string }>>;
  create: ReturnType<typeof createAction<string, { item: T }>>;
  createSuccess: ReturnType<typeof createAction<string, { item: T }>>;
  createFailure: ReturnType<typeof createAction<string, { error: string }>>;
  update: ReturnType<typeof createAction<string, { item: T }>>;
  updateSuccess: ReturnType<typeof createAction<string, { item: T }>>;
  updateFailure: ReturnType<typeof createAction<string, { error: string }>>;
  delete: ReturnType<typeof createAction<string, { id: string }>>;
  deleteSuccess: ReturnType<typeof createAction<string, { id: string }>>;
  deleteFailure: ReturnType<typeof createAction<string, { error: string }>>;
  select: ReturnType<typeof createAction<string, { id: string }>>;
}

export function createGenericActions<T extends BaseModel>(feature: string): GenericActions<T> {
  return {
    load: createAction(`[${feature}] Load`),
    loadSuccess: createAction(`[${feature}] Load Success`, props<{ items: T[] }>()),
    loadFailure: createAction(`[${feature}] Load Failure`, props<{ error: string }>()),
    
    create: createAction(`[${feature}] Create`, props<{ item: T }>()),
    createSuccess: createAction(`[${feature}] Create Success`, props<{ item: T }>()),
    createFailure: createAction(`[${feature}] Create Failure`, props<{ error: string }>()),
    
    update: createAction(`[${feature}] Update`, props<{ item: T }>()),
    updateSuccess: createAction(`[${feature}] Update Success`, props<{ item: T }>()),
    updateFailure: createAction(`[${feature}] Update Failure`, props<{ error: string }>()),
    
    delete: createAction(`[${feature}] Delete`, props<{ id: string }>()),
    deleteSuccess: createAction(`[${feature}] Delete Success`, props<{ id: string }>()),
    deleteFailure: createAction(`[${feature}] Delete Failure`, props<{ error: string }>()),
    
    select: createAction(`[${feature}] Select`, props<{ id: string }>()),
  };
}