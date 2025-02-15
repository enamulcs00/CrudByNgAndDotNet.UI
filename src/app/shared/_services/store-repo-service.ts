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
import {combineLatest, Observable} from 'rxjs';
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
import { ApiResponse, BaseModel, IGetApi, IPayloadApi,  } from '../models/general';
import { Category } from 'src/app/features/category/models/category.model';
import { CategoryListErrorAction, CategoryListRequestAction, CategoryListSuccessAction } from 'src/app/store/actions/category-action';
import { AccountService } from './account.service';
import { GenericActions } from 'src/app/core/ngrx-store/action';
import { createGenericSelectors } from 'src/app/core/ngrx-store/selector';
import { Router } from '@angular/router';


@Injectable()
export class StoreRepoService<T extends BaseModel> {
  constructor(private store: Store<RootReducerState>, private apiService: ApiService<T>,private usrSrv:AccountService, private router:Router ) {
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

  delete(id: string,action:GenericActions<T>, endPoint:string, path?:string) {
    // first we will call actual delete api
    this.apiService.deleteRecord(endPoint + '/'+ id).subscribe({
      next:()=> {
        this.store.dispatch(action.deleteSuccess({ id }));
        if(path){
      this.router.navigateByUrl(path);
        }
    },
      error:(error) =>{
        this.store.dispatch(action.deleteFailure(
         { error: error instanceof Error ? error.message : 'Failed to load data'}
        ));
      }
    })
  }

  update(param:IPayloadApi<T> , id?:string) {
    this.apiService.updateRecord(param.endPoint + "/" + id , param.payload).pipe(take(1)).subscribe({
      next:(value:ApiResponse<T>)=> {
      this.store.dispatch(param.actionName.updateSuccess({ item: value.data }));
      this.router.navigateByUrl(param.path);
    },
      error:(error) =>{
        this.store.dispatch(param.actionName.updateFailure(
         { error: error instanceof Error ? error.message : 'Failed to load data'}
        ));
      }
    });
  }

  add(param:IPayloadApi<T>):void {
    this.apiService.createRecord(param.endPoint , param.payload).pipe(take(1)).subscribe({
      next:(value:ApiResponse<T>)=> {
      this.store.dispatch(param.actionName.createSuccess({ item: value.data }));
      this.router.navigateByUrl(param.path);
    },
      error:(error) =>{
        this.store.dispatch(param.actionName.createFailure(
         { error: error instanceof Error ? error.message : 'Failed to load data'}
        ));
      }
    });
  }

  getRecordById(param:IGetApi<T>, id:string):Observable<T> {
    const selector = createGenericSelectors<T>(param.featureName);
   // get user from reducer if exist otherwise from api
    const user$ = this.store.select(selector.selectById(id));
    user$.pipe(take(1)).subscribe(res => {
      if (param.force || !res) {
        return this.apiService.getById(id , param.endPoint).pipe(take(1)).subscribe({
          next:(data:ApiResponse<T>)=>{
            this.store.dispatch(param.actionName.createSuccess({ item: data.data }));
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
