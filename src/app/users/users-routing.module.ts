import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { PostsComponent } from '../features/posts/posts.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: PostsComponent },
            { path: 'add', component: AddEditComponent },
            { path: 'edit/:id', component: AddEditComponent },
            {
                path: 'posts',
                component: PostsComponent
               },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }