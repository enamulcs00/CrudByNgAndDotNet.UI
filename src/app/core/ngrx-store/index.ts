import { ActionReducerMap } from '@ngrx/store';
import { Category, Product, Student, User } from 'src/app/shared/models/general';
import { createGenericActions } from './action';
import { GenericState } from './generic.state';
import { createGenericReducer } from './reducer';


export interface AppState {
  categories: GenericState<Category>;
  products: GenericState<Product>;
  students: GenericState<Student>;
  users: GenericState<User>;
}

// Create actions for each entity
export const categoryActions = createGenericActions<Category>('Category');
export const productActions = createGenericActions<Product>('Product');
export const studentActions = createGenericActions<Student>('Student');
export const userActions = createGenericActions<User>('User');

// Create reducers
export const reducers: ActionReducerMap<AppState> = {
  categories: createGenericReducer<Category>(categoryActions),
  products: createGenericReducer<Product>(productActions),
  students: createGenericReducer<Student>(studentActions),
  users: createGenericReducer<User>(userActions),
};