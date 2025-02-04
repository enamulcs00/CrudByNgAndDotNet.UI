import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { MarkdownModule } from 'ngx-markdown';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { ImageSelectorComponent } from './shared/components/image-selector/image-selector.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
import { ErrorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './store/reducers';
import { ApiService } from './shared/_services/api.service';
import { HttpService } from './shared/_services/http.service';
import { StoreRepoService } from './shared/_services/store-repo-service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { genericReducer } from './store/dummy-store/reducer';
import { GenericService } from './shared/_services/store.service';
import { reducers } from './store/dummy-store';
@NgModule({ declarations: [
        AppComponent,
        NavbarComponent,
        CategoryListComponent,
        AddCategoryComponent,
        EditCategoryComponent,
        BlogpostListComponent,
        AddBlogpostComponent,
        EditBlogpostComponent,
        ImageSelectorComponent,
        HomeComponent,
        BlogDetailsComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        CommonModule,
        MarkdownModule.forRoot(),
        NgxUiLoaderModule,
        ToastrModule.forRoot({
            timeOut: 5000,
            preventDuplicates: true,
        }),
        StoreModule.forRoot(rootReducer),
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })],
         providers: [
            HttpService, ApiService, StoreRepoService,GenericService,

        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
