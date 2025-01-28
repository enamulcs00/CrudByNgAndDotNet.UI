import { createAction, props } from '@ngrx/store';

// Generic CRUD Action Helper
export class CrudActions<T> {
  constructor(private entityName: string) {}

  load = createAction(`[${this.entityName}] Load`);
  loadSuccess = createAction(`[${this.entityName}] Load Success`, props<{ data: T[] }>());
  loadFailure = createAction(`[${this.entityName}] Load Failure`, props<{ error: any }>());

  create = createAction(`[${this.entityName}] Create`, props<{ data: T }>());
  createSuccess = createAction(`[${this.entityName}] Create Success`, props<{ data: T }>());
  createFailure = createAction(`[${this.entityName}] Create Failure`, props<{ error: any }>());

  update = createAction(`[${this.entityName}] Update`, props<{ id: string; changes: Partial<T> }>());
  updateSuccess = createAction(`[${this.entityName}] Update Success`, props<{ data: T }>());
  updateFailure = createAction(`[${this.entityName}] Update Failure`, props<{ error: any }>());

  delete = createAction(`[${this.entityName}] Delete`, props<{ id: string }>());
  deleteSuccess = createAction(`[${this.entityName}] Delete Success`, props<{ id: string }>());
  deleteFailure = createAction(`[${this.entityName}] Delete Failure`, props<{ error: any }>());
}
