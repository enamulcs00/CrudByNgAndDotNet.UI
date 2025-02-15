import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { ApiResponse, IGetApi,  } from 'src/app/shared/models/general';
import { StoreRepoService } from 'src/app/shared/_services';
import { endPoints } from 'src/app/shared/routes/endpoints';
import { categoryActions } from 'src/app/core/ngrx-store';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css'],
    standalone: false
})
export class CategoryListComponent implements OnInit {
  categories$?: Observable<Category[]>;
  totalCount?: number;
  list: number[] = [];
  pageNumber = 1;
  pageSize = 20;

  constructor(private categoryService: CategoryService , private _service:StoreRepoService<Category>) {
  }

  ngOnInit(): void {
    // this.categoryService.getCategoryCount()
    //   .subscribe({
    //     next: (value) => {
    //       this.totalCount = value.data;
    //       this.list = new Array(Math.ceil(value.data / this.pageSize))
    //       console.log('list ', this.list);
    //       const obj:IServiceParams = {};
    //       obj.pageNumber = this.pageNumber
    //       obj.pageSize = this.pageSize
    //     }
    //   })
     let param:IGetApi<Category> = {
          endPoint:endPoints.category.url,
          actionName:categoryActions,
          force:false,
          featureName:'categories',
        }
    this.categories$ = this._service.getAll(param);

  }

  onSearch(query: string) {
    this.categories$ = this.categoryService.getAllCategories(query);
  }

  sort(sortBy: string, sortDirection: string) {
    this.categories$ = this.categoryService.getAllCategories(undefined, sortBy, sortDirection);
  }

  getPage(pageNumber: number) {
    this.pageNumber = pageNumber;

    this.categories$ = this.categoryService.getAllCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }


  getNextPage() {
    if (this.pageNumber + 1 > this.list.length) {
      return;
    }

    this.pageNumber += 1;
    this.categories$ = this.categoryService.getAllCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }

  getPrevPage() {
    if (this.pageNumber - 1 < 1) {
      return;
    }

    this.pageNumber -= 1;
    this.categories$ = this.categoryService.getAllCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }

}
