// src/app/store/generic.actions.ts
import { createAction, props } from '@ngrx/store';

export enum GenericActionTypes {
  LOAD = '[Generic] Load',
  LOAD_SUCCESS = '[Generic] Load Success',
  LOAD_FAILURE = '[Generic] Load Failure',
  CREATE_SUCCESS = '[Generic] Create Success',
  UPDATE_SUCCESS = '[Generic] Update Success',
  DELETE_SUCCESS = '[Generic] Delete Success',
}

export const GenericActions = {
  load: createAction(GenericActionTypes.LOAD, props<{ entityName: string }>()),
  loadSuccess: createAction(
    GenericActionTypes.LOAD_SUCCESS,
    props<{ entityName: string; data: any[] }>()
  ),
  loadFailure: createAction(
    GenericActionTypes.LOAD_FAILURE,
    props<{ entityName: string; error: string }>()
  ),
  createSuccess: createAction(
    GenericActionTypes.CREATE_SUCCESS,
    props<{ entityName: string; entity: any }>()
  ),
  updateSuccess: createAction(
    GenericActionTypes.UPDATE_SUCCESS,
    props<{ entityName: string; entity: any }>()
  ),
  deleteSuccess: createAction(
    GenericActionTypes.DELETE_SUCCESS,
    props<{ entityName: string; id: string }>()
  ),
};
