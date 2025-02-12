import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { StoreRepoService } from 'src/app/shared/_services';
import { endPoints } from 'src/app/shared/endpoints';
import { IPostApi } from 'src/app/shared/models/general';
import { categoryActions } from 'src/app/core/ngrx-store';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.css'],
    standalone: false
})
export class AddCategoryComponent implements OnDestroy , OnInit{

  model: AddCategoryRequest;
  private addCategorySubscribtion?: Subscription;

  constructor(private categoryService: CategoryService,private store:StoreRepoService<AddCategoryRequest>,
    private router: Router) {
    this.model = {
      name: '',
      urlHandle: '',
      id:''
    };
  }

ngOnInit(): void {
  
}
  onFormSubmit() {
    let param:IPostApi<AddCategoryRequest> = {
      payload:this.model,
      endPoint:endPoints.category.url,
      actionName:categoryActions,
      force:false,
      featureName:'categories'
    }
    this.addCategorySubscribtion = this.store.add(param)
    .subscribe({
      next: (response) => {
        console.log('res', response);
        
        this.router.navigateByUrl('/admin/categories');
      }
    })
  }

  ngOnDestroy(): void {
    this.addCategorySubscribtion?.unsubscribe();
  }

}
