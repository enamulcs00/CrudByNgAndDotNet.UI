import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, categoryActions } from 'src/app/core/ngrx-store';
import { createGenericSelectors } from 'src/app/core/ngrx-store/selector';
import { CategoryService } from '../_services/entity.service';
import { Category } from '../models/general';
import { GenericListComponent } from './list';


@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, GenericListComponent],
  template: `
    <h2>Categories</h2>
    <button (click)="addNewCategory()" class="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
      Add New Category
    </button>
    
    <div *ngIf="selectedCategory$ | async as category" class="mb-4 p-4 bg-gray-100 rounded">
      <h3>Selected Category:</h3>
      <p>Name: {{ category.name }}</p>
      <p>Description: {{ category.urlHandle }}</p>
    </div>

    <app-generic-list
      [items]="(categories$ | async) || []"
      [loading]="loading$ | async"
      [error]="error$ | async"
      (edit)="onEdit($event)"
      (delete)="onDelete($event)"
      (select)="onSelect($event)"
      [itemTemplate]="categoryTemplate"
    >
      <ng-template #categoryTemplate let-category>
        <div>
          <h3>{{ category.name }}</h3>
          <p>{{ category.description }}</p>
        </div>
      </ng-template>
    </app-generic-list>
  `
})
export class CategoryListComponent implements OnInit {
  private selectors = createGenericSelectors<Category>('categories');
  
  categories$: Observable<Category[]> = this.store.select(this.selectors.selectAll);
  loading$: Observable<boolean> = this.store.select(this.selectors.selectLoading);
  loaded$: Observable<boolean> = this.store.select(this.selectors.selectLoaded);
  error$: Observable<string | null> = this.store.select(this.selectors.selectError);
  selectedCategory$: Observable<Category | null> = this.store.select(this.selectors.selectSelected);

  constructor(
    private store: Store<AppState>,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.store.dispatch(categoryActions.load());
    
    // Load initial data
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.store.dispatch(categoryActions.loadSuccess({ items: categories }));
      },
      error: (error) => {
        this.store.dispatch(categoryActions.loadFailure({ 
          error: error instanceof Error ? error.message : 'Failed to load categories' 
        }));
      }
    });
  }

  addNewCategory() {
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name: 'New Category',
      urlHandle: 'New Category Description'
    };

    this.categoryService.create(newCategory).subscribe({
      next: (createdCategory) => {
        this.store.dispatch(categoryActions.createSuccess({ item: createdCategory }));
      },
      error: (error) => {
        this.store.dispatch(categoryActions.createFailure({ 
          error: error instanceof Error ? error.message : 'Failed to create category' 
        }));
      }
    });
  }

  onSelect(category: Category) {
    this.categoryService.getById(category.id.toString()).subscribe({
      next: (foundCategory) => {
        if (foundCategory) {
          this.store.dispatch(categoryActions.select({ id: foundCategory.id.toString() }));
        }
      },
      error: (error) => {
        console.error('Failed to get category:', error);
      }
    });
  }

  onEdit(category: Category) {
    this.store.dispatch(categoryActions.select({ id: category.id.toString() }));
    this.categoryService.update(category).subscribe({
      next: (updatedCategory) => {
        this.store.dispatch(categoryActions.updateSuccess({ item: updatedCategory }));
      },
      error: (error) => {
        this.store.dispatch(categoryActions.updateFailure({ 
          error: error instanceof Error ? error.message : 'Failed to update category' 
        }));
      }
    });
  }

  onDelete(category: Category) {
    this.categoryService.delete(category.id.toString()).subscribe({
      next: () => {
        this.store.dispatch(categoryActions.deleteSuccess({ id: category.id.toString() }));
      },
      error: (error) => {
        this.store.dispatch(categoryActions.deleteFailure({ 
          error: error instanceof Error ? error.message : 'Failed to delete category' 
        }));
      }
    });
  }
}