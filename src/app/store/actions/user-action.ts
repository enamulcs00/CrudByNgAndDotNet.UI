import { BlogPost } from "src/app/features/blog-post/models/blog-post.model";
import { User } from "src/app/shared/models/user";

export const USER_LIST_REQUEST = 'user list request';
export const USER_LIST_SUCCESS = 'user list success';
export const USER_DELETE = 'user delete';
export const USER_UPDATE = 'user update';
export const USER_ADD = 'user add';
export const USER_LIST_ERROR = 'user list error';

export class UserListRequestAction {
  readonly type = USER_LIST_REQUEST;
}

export class UserDeleteAction {
  readonly type = USER_DELETE;
  constructor(public payload?: { id: string }) {
  }
}

export class UserUpdateAction {
  readonly type = USER_UPDATE;
  constructor(public payload?: { data: any }) {
  }
}

export class UserAddAction {
  readonly type = USER_ADD;
  constructor(public payload?: { data: BlogPost }) {
  }
}

export class UserListErrorAction {
  readonly type = USER_LIST_ERROR;
}

export class UserListSuccessAction {
  readonly type = USER_LIST_SUCCESS;
  constructor(public payload?: { data: BlogPost[] }) {
  }
}

// Registered user Actions
export const REGISTERED_USER_LIST = 'registered user list';
export const REGISTERED_SUCCESS = 'registered success';
export const REGISTERED_USER_DELETE = 'registered user delete';
export const REGISTERED_USER_UPDATE = 'registered user update';
export const REGISTERED_USER_ADD = 'registered user add';
export const REGISTERED_ERROR = 'registered error';

export class RegisteredUserListRequestAction {
  readonly type = REGISTERED_USER_LIST;
}

export class RegisteredUserDeleteAction {
  readonly type = REGISTERED_USER_DELETE;
  constructor(public payload?: { id: string }) {
  }
}

export class RegisteredUserUpdateAction {
  readonly type = REGISTERED_USER_UPDATE;
  constructor(public payload?: { data: User }) {
  }
}

export class RegisteredUserAddAction {
  readonly type = REGISTERED_USER_ADD;

  constructor(public payload?: { data: User }) {
  }
}

export class RegisteredUserListErrorAction {
  readonly type = REGISTERED_ERROR;
}

export class RegisteredUserListSuccessAction {
  readonly type = REGISTERED_SUCCESS;
  constructor(public payload?: { data: User[] }) {
  }
}
