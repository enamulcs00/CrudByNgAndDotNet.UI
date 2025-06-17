import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { AddEditComponent } from './add-edit.component';
import { ListComponent } from './list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: ListComponent },
            { path: 'add', component: AddEditComponent },
            { path: 'edit/:id', component: AddEditComponent },
            
        ]
    }
];
  
  @NgModule({
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent,
    ],
    imports: [
      CommonModule,
      SharedModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
export class UsersModule { }