import { Category } from "src/app/features/category/models/category.model";

export const CATEGORY_LIST_REQUEST = 'category list request';
export const CATEGORY_LIST_SUCCESS = 'category list success';
export const CATEGORY_DELETE = 'category delete';
export const CATEGORY_UPDATE = 'category update';
export const CATEGORY_ADD = 'category add';
export const CATEGORY_LIST_ERROR = 'category list error';

export class CategoryListRequestAction {
  readonly type = CATEGORY_LIST_REQUEST;
}

export class CategoryDeleteAction {
  readonly type = CATEGORY_DELETE;

  constructor(public payload?: { id: string }) {
  }
}

export class CategoryUpdateAction {
  readonly type = CATEGORY_UPDATE;

  constructor(public payload?: { data: Category }) {
  }
}

export class CategoryAddAction {
  readonly type = CATEGORY_ADD;

  constructor(public payload?: { data: Category }) {
  }
}

export class CategoryListErrorAction {
  readonly type = CATEGORY_LIST_ERROR;
}

export class CategoryListSuccessAction {
  readonly type = CATEGORY_LIST_SUCCESS;

  constructor(public payload?: { data: Category[] }) {
  }
}
