import { Component} from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { StoreRepoService } from 'src/app/shared/_services';
import { endPoints } from 'src/app/shared/routes/endpoints';
import { IPayloadApi } from 'src/app/shared/models/general';
import { categoryActions } from 'src/app/core/ngrx-store';
import { URLs } from 'src/app/shared/routes/URLs';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.css'],
    standalone: false
})
export class AddCategoryComponent {
  model: AddCategoryRequest;
  constructor(private store:StoreRepoService<AddCategoryRequest>) {
    this.model = {
      name: '',
      urlHandle: '',
      id:''
    };
  }
  onFormSubmit() {
    let param:IPayloadApi<AddCategoryRequest> = {
      payload:this.model,
      endPoint:endPoints.category.url,
      actionName:categoryActions,
      force:false,
      featureName:'categories',
      path:URLs.categoryList
    }
    this.store.add(param);
  }
}
