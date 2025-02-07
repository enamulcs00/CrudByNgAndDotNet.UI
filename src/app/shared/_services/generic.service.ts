import { Injectable } from '@angular/core';
import { BaseModel } from '../models/general';


@Injectable({
  providedIn: 'root'
})
export class GenericService<T extends BaseModel> {
  protected items: T[] = [];

  // Simulated API delay
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll(): Promise<T[]> {
    await this.delay(500); // Simulate network delay
    return this.items;
  }

  async getById(id: string): Promise<T | undefined> {
    await this.delay(300);
    return this.items.find(item => item.id.toString() === id);
  }

  async create(item: T): Promise<T> {
    await this.delay(300);
    this.items.push(item);
    return item;
  }

  async update(item: T): Promise<T> {
    await this.delay(300);
    const index = this.items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.items[index] = item;
    }
    return item;
  }

  async delete(id: string): Promise<string> {
    await this.delay(300);
    this.items = this.items.filter(item => item.id.toString() !== id);
    return id;
  }
}