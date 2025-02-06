import * as fromUser from './user-reducer';
import * as fromCategory from './category-reducer';
import * as fromPost from './post-reducer';
import {ActionReducerMap, createSelector} from '@ngrx/store';
import { genericReducer, GenericState } from '../dummy-store/reducer';


export interface RootReducerState {
  users: fromUser.UserReducerState;
  post: fromPost.PostReducerState;
  categories: fromCategory.CategoryReducerState;
  registeredUsers:fromUser.RegisteredUserReducerState,
  enamul:GenericState<any>
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  users: fromUser.UserReducer,
  post: fromPost.PostReducer,
  categories:fromCategory.CategoryReducer,
  registeredUsers:fromUser.RegisteredUserReducer,
  enamul:genericReducer
};

export const getUserState = (state: RootReducerState) => state.users;

export const getUserLoaded = createSelector(getUserState, fromUser.getLoaded);
export const getUserLoading = createSelector(getUserState, fromUser.getLoading);
export const getUserEntities = createSelector(getUserState, fromUser.getEntities);
export const getUsers = createSelector(getUserState, fromUser.getUsers);
export const getUserError = createSelector(getUserState, fromUser.getError);

export const getUserById = (state: RootReducerState, id: string) => {
  const entities = getUserEntities(state);
  return entities[id];
};

// Register users 
export const getRegisteredUserState = (state: RootReducerState) => state.registeredUsers;

export const getRegisteredUserLoaded = createSelector(getRegisteredUserState, fromUser.findLoaded);
export const getRegisteredUserLoading = createSelector(getRegisteredUserState, fromUser.findLoading);
export const getRegisteredUserEntities = createSelector(getRegisteredUserState, fromUser.findEntities);
export const getRegisteredUsers = createSelector(getRegisteredUserState, fromUser.getRegisteredUsers);
export const getRegisteredUserError = createSelector(getRegisteredUserState, fromUser.getRegistergError);

export const getRegisteredUserById = (state: RootReducerState, id: string) => {
  const entities = getRegisteredUserEntities(state);
  return entities[id];
};

export const getCategoryState = (state: RootReducerState) => state.categories;

export const getCategoryLoaded = createSelector(getCategoryState, fromCategory.getLoaded);
export const getCategoryLoading = createSelector(getCategoryState, fromCategory.getLoading);
export const getCategoryEntities = createSelector(getCategoryState, fromCategory.getEntities);
export const getCategories = createSelector(getCategoryState, fromCategory.getCategories);
export const getCategoryError = createSelector(getCategoryState, fromCategory.getError);

export const getCategoryById = (state: RootReducerState, id: string) => {
  const entities = getCategoryEntities(state);
  return entities[id];
};

export const getPostState = (state: RootReducerState) => state.post;

export const getPostLoaded = createSelector(getPostState, fromPost.getLoaded);
export const getPostLoading = createSelector(getPostState, fromPost.getLoading);
export const getPostEntities = createSelector(getPostState, fromPost.getEntities);
export const getPosts = createSelector(getPostState, fromPost.getPosts);
export const getPostError = createSelector(getPostState, fromPost.getError);

export const getPostById = (state: RootReducerState, id: string) => {
  const entities = getUserEntities(state);
  return entities[id];
};

