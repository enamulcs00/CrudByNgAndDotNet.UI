import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  getCategories,
  getCategoryLoaded,
  getCategoryLoading,
  getPostError,
  getPostLoaded,
  getPostLoading,
  getPosts,
  getRegisteredUserLoaded,
  getRegisteredUserLoading,
  getRegisteredUsers,
  getUserById,
  RootReducerState
} from 'src/app/store/reducers';
import {combineLatest, Observable, of} from 'rxjs';
import {
  RegisteredUserListErrorAction,
  RegisteredUserListRequestAction,
  RegisteredUserListSuccessAction,
  UserAddAction,
  UserUpdateAction
} from 'src/app/store/actions/user-action';
import {ApiService} from './api.service';
import {User} from '../models/user';
import {take} from 'rxjs/operators';
import {
  CommentAddAction, CommentDeleteAction,
  CommentUpdateAction,
  PostListErrorAction,
  PostListRequestAction,
  PostListSuccessAction
} from 'src/app/store/actions/post-action';
import { BlogPost } from 'src/app/features/blog-post/models/blog-post.model';
import { ApiResponse, BaseModel, IGetApi, IPostApi,  } from '../models/general';
import { Category } from 'src/app/features/category/models/category.model';
import { CategoryListErrorAction, CategoryListRequestAction, CategoryListSuccessAction } from 'src/app/store/actions/category-action';
import { AccountService } from './account.service';
import { GenericActions } from 'src/app/core/ngrx-store/action';
import { createGenericSelectors } from 'src/app/core/ngrx-store/selector';


@Injectable()
export class StoreRepoService<T extends BaseModel> {
  constructor(private store: Store<RootReducerState>, private apiService: ApiService<T>,private usrSrv:AccountService) {
  }

  getRegisterdUsers(force = false): Observable<User[]> {
    const loading$ = this.store.select(getRegisteredUserLoading);
    const loaded$ = this.store.select(getRegisteredUserLoaded);
    combineLatest([loaded$, loading$]).pipe(take(1)).subscribe((data) => {
      if ((!data[0] && !data[1]) || force) {        
        this.store.dispatch(new RegisteredUserListRequestAction());
        this.usrSrv.getAllUsers().pipe(take(1)).subscribe({
          next:(value:ApiResponse<User[]>)=> {
          this.store.dispatch(new RegisteredUserListSuccessAction({data: value.data}));
          },
          error:() =>{
            this.store.dispatch(new RegisteredUserListErrorAction());
          }
        });
      }
    });
    return this.store.select(getRegisteredUsers) as Observable<User[]>;
  }
   getAllCategories(param:IGetApi<T>): Observable<Category[]> {
    const loading$ = this.store.select(getCategoryLoading);
    const loaded$ = this.store.select(getCategoryLoaded);
    combineLatest([loaded$, loading$]).pipe(take(1)).subscribe((data) => {
      if ((!data[0] && !data[1]) || param.force) {        
        this.store.dispatch(new CategoryListRequestAction());
        this.apiService.getAllCategories(param).pipe(take(1)).subscribe({
          next:(value:ApiResponse<Category[]>)=> {
          this.store.dispatch(new CategoryListSuccessAction({data: value.data}));
          },
          error:() =>{
            this.store.dispatch(new CategoryListErrorAction());
          }
        });
      }
    });
    return this.store.select(getCategories) as Observable<Category[]>;
    }

  getAll(param:IGetApi<T>): Observable<T[]> {
    const selector = createGenericSelectors<T>(param.featureName);
    const loading$ = this.store.select(selector.selectLoading);
    const loaded$ = this.store.select(selector.selectLoaded);
    combineLatest([loaded$, loading$]).pipe(take(1)).subscribe((data) => {      
      if ((!data[0] && !data[1]) || param.force) {        
        this.store.dispatch(param.actionName.load());
        this.apiService.getAll(param.endPoint).pipe(take(1)).subscribe({
          next:(value:ApiResponse<T[]>)=> {
          this.store.dispatch(param.actionName.loadSuccess({ items: value.data }))},
          error:(error) =>{
            this.store.dispatch(param.actionName.loadFailure(
             { error: error instanceof Error ? error.message : 'Failed to load data'}
            ));
          }
        });
      }
    });
    return this.store.select(selector.selectAll);
  }

  deleteUser(id: string,action:GenericActions<T>) {
    // first we will call actual delete api
    this.store.dispatch(action.deleteSuccess({ id }));
  }

  updateUser(data: User) {
// first send details to actual api
    this.store.dispatch(new UserUpdateAction({data}));
  }

  add(param:IPostApi<T>):Observable<T> {
    const selector = createGenericSelectors<T>(param.featureName);
    let id = ''
    this.apiService.createRecord(param.endPoint , param?.payload).pipe(take(1)).subscribe({
      next:(value:ApiResponse<T>)=> {
        id = value.data.id
      // add router logic here if you want
        
      this.store.dispatch(param.actionName.createSuccess({ item: value.data }))},
      error:(error) =>{
        this.store.dispatch(param.actionName.createFailure(
         { error: error instanceof Error ? error.message : 'Failed to load data'}
        ));
      }
    });
    return this.store.select(selector.selectById(id)) as Observable<T>;
  }

  getUserById(id: string, force:boolean = false):Observable<BlogPost> {
    // get user from reducer if exist otherwise from api
    const user$ = this.store.select(state => getUserById(state, id));
    user$.pipe(take(1)).subscribe(res => {
      if (force || !res) {
        return this.apiService.getUser(id).pipe(take(1)).subscribe({
          next:(data:ApiResponse<BlogPost>)=>{
          this.store.dispatch(new UserAddAction({data:data.data}));
          }
        });
      }
      return res;
    });
    return user$;
  }

  getAllPost(force = false): [Observable<boolean>, Observable<any[]>, Observable<boolean>] {
    const post$ = this.store.select(getPosts);
    const loaded$ = this.store.select(getPostLoading);
    const loading$ = this.store.select(getPostLoaded);
    const getError$ = this.store.select(getPostError);
    combineLatest([loaded$, loading$]).pipe(take(1)).subscribe((data) => {
      if ((!data[0] && !data[1]) || force) {
        this.store.dispatch(new PostListRequestAction());
        this.apiService.getAllPost().subscribe(res => {
          this.store.dispatch(new PostListSuccessAction({data: res}));
        }, error => {
          this.store.dispatch(new PostListErrorAction());
        });
      }
    });
    return [loading$, post$, getError$];
  }

  addComment(comment: Comment, postId: number) {
    this.store.dispatch(new CommentAddAction({data: comment, postId}));
  }

  updateComment(comment: Comment, postId: number) {
    this.store.dispatch(new CommentUpdateAction({data: comment, postId}));
  }

  deleteComment(commentId: number, postId: number) {
    this.store.dispatch(new CommentDeleteAction({id: commentId, postId}));
  }
}
