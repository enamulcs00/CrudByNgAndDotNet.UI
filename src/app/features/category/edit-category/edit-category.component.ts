import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { StoreRepoService } from 'src/app/shared/_services';
import { IGetApi, IPayloadApi } from 'src/app/shared/models/general';
import { endPoints } from 'src/app/shared/routes/endpoints';
import { categoryActions } from 'src/app/core/ngrx-store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.css'],
    standalone: false
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  categoryForm?:FormGroup = new FormGroup({});
  id: string = '';
  paramsSubscription?: Subscription;
  editCategorySubscription?: Subscription;
  category?: Category;

  constructor(private route: ActivatedRoute,
    private categoryService: CategoryService,private repo:StoreRepoService<Category>,
    private router: Router , private fb:FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id')?? "";

        if (this.id) {
          // get the data from the API for this category Id
              let param:IGetApi<Category> = {
                    endPoint:endPoints.category.url,
                    actionName:categoryActions,
                    force:false,
                    featureName:'categories',
                  }
          this.repo.getRecordById( param,this.id)
          .subscribe({
            next: (response) => {
              console.log('response', response);
              
              this.category = response;
              this.categoryForm?.patchValue(response);
            }
          });

        }
      }
    });
  }
initForm():void {
  this.categoryForm = this.fb.group({
    name:['', Validators.required],
    urlHandle:['', Validators.required]
  })
}
  onFormSubmit(): void {
  let param:IPayloadApi<UpdateCategoryRequest> = {
        payload:this.categoryForm?.value,
        endPoint:endPoints.category.url,
        actionName:categoryActions,
        force:false,
        featureName:'categories',
        path:'/admin/categories'
      }
    // pass this object to service
    if (this.id) {
      this.repo.update(param , this.id)
    }
  }

  onDelete(): void {
    if (this.id) {
      this.repo.delete(this.id , categoryActions,endPoints.category.url, '/admin/categories');
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }
}
