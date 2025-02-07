import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModel } from '../models/general';

@Component({
  selector: 'app-generic-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="generic-list">
      <div *ngIf="loading">Loading...</div>
      <div *ngIf="error">{{ error }}</div>
      
      <div *ngFor="let item of items" class="list-item" (click)="onSelect(item)">
        <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }">
        </ng-container>
        <div class="actions">
          <button (click)="onEdit(item); $event.stopPropagation()">Edit</button>
          <button (click)="onDelete(item); $event.stopPropagation()">Delete</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .generic-list {
      padding: 1rem;
    }
    .list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      border-bottom: 1px solid #eee;
      cursor: pointer;
    }
    .actions {
      display: flex;
      gap: 0.5rem;
    }
  `]
})
export class GenericListComponent<T extends BaseModel> {
  @Input() items: T[] = [];
  @Input() loading: boolean | null = false;
  @Input() error: string | null = null;
  @Input() itemTemplate!: TemplateRef<{ $implicit: T }>;

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();
  @Output() select = new EventEmitter<T>();

  onEdit(item: T): void {
    this.edit.emit(item);
  }

  onDelete(item: T): void {
    this.delete.emit(item);
  }

  onSelect(item: T): void {
    this.select.emit(item);
  }
}