// src/app/services/generic.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { GenericActions } from 'src/app/store/dummy-store/action';
import { GenericState } from '../models/general';


@Injectable({
  providedIn: 'root',
})
export class GenericService<T> {
  constructor(private http: HttpClient, private store: Store<GenericState<T>>) {}

  getAll(apiUrl: string, entityName: string): Observable<T[]> {
    return this.store.select((state: any) => state[entityName]?.entities).pipe(
      take(1),
      switchMap((data) => {
        if (data && data.length > 0) {
          return of(data);
        } else {
          this.store.dispatch(GenericActions.load({ entityName }));
          return this.http.get<T[]>(apiUrl).pipe(
            map((response) => {
              this.store.dispatch(GenericActions.loadSuccess({ entityName, data: response }));
              return response;
            }),
            catchError((error) => {
              this.store.dispatch(GenericActions.loadFailure({ entityName, error: error.message }));
              return of([]);
            })
          );
        }
      })
    );
  }

  getById(apiUrl: string, entityName: string, id: string): Observable<T> {
    return this.http.get<T>(`${apiUrl}/${id}`).pipe(
      map((entity) => {
        this.store.dispatch(GenericActions.loadSuccess({ entityName, data: [entity] }));
        return entity;
      }),
      catchError((error) => {
        this.store.dispatch(GenericActions.loadFailure({ entityName, error: error.message }));
        throw error;
      })
    );
  }

  create(apiUrl: string, entityName: string, entity: T): Observable<T> {
    return this.http.post<T>(apiUrl, entity).pipe(
      map((newEntity) => {
        this.store.dispatch(GenericActions.createSuccess({ entityName, entity: newEntity }));
        return newEntity;
      }),
      catchError((error) => {
        this.store.dispatch(GenericActions.loadFailure({ entityName, error: error.message }));
        throw error;
      })
    );
  }

  update(apiUrl: string, entityName: string, entity: T): Observable<T> {
    return this.http.put<T>(`${apiUrl}/${(entity as any).id}`, entity).pipe(
      map((updatedEntity) => {
        this.store.dispatch(GenericActions.updateSuccess({ entityName, entity: updatedEntity }));
        return updatedEntity;
      }),
      catchError((error) => {
        this.store.dispatch(GenericActions.loadFailure({ entityName, error: error.message }));
        throw error;
      })
    );
  }

  delete(apiUrl: string, entityName: string, id: string): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/${id}`).pipe(
      map(() => {
        this.store.dispatch(GenericActions.deleteSuccess({ entityName, id }));
      }),
      catchError((error) => {
        this.store.dispatch(GenericActions.loadFailure({ entityName, error: error.message }));
        throw error;
      })
    );
  }
}
