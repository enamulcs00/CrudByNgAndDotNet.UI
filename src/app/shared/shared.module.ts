import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClickOutsideDirective, EmptyStateComponent, GenericTableComponent, LazyLoadImageDirective, TruncatePipe } from '.';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
];

const STANDALONE_COMPONENTS = [
  GenericTableComponent,
  EmptyStateComponent

];

const STANDALONE_DIRECTIVES = [
  ClickOutsideDirective,
  LazyLoadImageDirective
];

const STANDALONE_PIPES = [
  TruncatePipe,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...MATERIAL_MODULES,
    ...STANDALONE_COMPONENTS,
    ...STANDALONE_DIRECTIVES,
    ...STANDALONE_PIPES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...MATERIAL_MODULES,
    ...STANDALONE_COMPONENTS,
    ...STANDALONE_DIRECTIVES,
    ...STANDALONE_PIPES
  ]
})
export class SharedModule {}