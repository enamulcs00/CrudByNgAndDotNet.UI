import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
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
    <app-generic-list
      [items]="categories$ | async"
      [loading]="loading$ | async"
      [error]="error$ | async"
      (edit)="onEdit($event)"
      (delete)="onDelete($event)"
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
  
  categories$ = this.store.select(this.selectors.selectAll);
  loading$ = this.store.select(this.selectors.selectLoading);
  error$ = this.store.select(this.selectors.selectError);

  constructor(
    private store: Store<AppState>,
    private categoryService: CategoryService
  ) {}

  async ngOnInit() {
    this.store.dispatch(categoryActions.load());
    
    // Check if data exists in store
    const items = await firstValueFrom(this.categories$);
    if (!items || items.length === 0) {
      try {
        // Load from service if store is empty
        const categories = await this.categoryService.getAll();
        this.store.dispatch(categoryActions.loadSuccess({ items: categories }));
      } catch (error) {
        this.store.dispatch(categoryActions.loadFailure({ 
          error: error instanceof Error ? error.message : 'Failed to load categories' 
        }));
      }
    }
  }

  async onEdit(category: Category) {
    this.store.dispatch(categoryActions.select({ id: category.id.toString() }));
    try {
      const updatedCategory = await this.categoryService.update(category);
      this.store.dispatch(categoryActions.updateSuccess({ item: updatedCategory }));
    } catch (error) {
      this.store.dispatch(categoryActions.updateFailure({ 
        error: error instanceof Error ? error.message : 'Failed to update category' 
      }));
    }
  }

  async onDelete(category: Category) {
    try {
      await this.categoryService.delete(category.id.toString());
      this.store.dispatch(categoryActions.deleteSuccess({ id: category.id.toString() }));
    } catch (error) {
      this.store.dispatch(categoryActions.deleteFailure({ 
        error: error instanceof Error ? error.message : 'Failed to delete category' 
      }));
    }
  }
}