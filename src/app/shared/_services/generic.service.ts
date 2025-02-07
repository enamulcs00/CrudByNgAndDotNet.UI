import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { BaseModel } from '../models/general';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T extends BaseModel> {
  protected items: T[] = [];

  // Simulated API delay using RxJS
  private simulateDelay<T>(data: T): Observable<T> {
    return of(data).pipe(delay(300));
  }

  getAll(): Observable<T[]> {
    return this.simulateDelay(this.items);
  }

  getById(id: string): Observable<T | undefined> {
    return this.simulateDelay(this.items.find(item => item.id.toString() === id));
  }

  create(item: T): Observable<T> {
    this.items.push(item);
    return this.simulateDelay(item);
  }

  update(item: T): Observable<T> {
    const index = this.items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.items[index] = item;
    }
    return this.simulateDelay(item);
  }

  delete(id: string): Observable<string> {
    this.items = this.items.filter(item => item.id.toString() !== id);
    return this.simulateDelay(id);
  }
}