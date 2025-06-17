import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule
  ],
  template: `
    <div class="table-container">
      <mat-form-field appearance="outline" class="filter-field">
        <mat-label>Filter</mat-label>
        <input matInput (keyup)="applyFilter($event)" placeholder="Search" #input>
      </mat-form-field>

      <div class="mat-elevation-z8">
        <table mat-table [dataSource]="dataSource" matSort multiTemplateDataRows>
          <!-- Expand Column -->
          <ng-container matColumnDef="expand">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let element">
              <button mat-icon-button (click)="toggleRow(element, $event)">
                <mat-icon>
                  {{expandedElement === element ? 'expand_less' : 'expand_more'}}
                </mat-icon>
              </button>
            </td>
          </ng-container>

          <!-- Regular Columns -->
          <ng-container *ngFor="let column of displayedColumns" [matColumnDef]="column">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column | titlecase}} </th>
            <td mat-cell *matCellDef="let element"> {{element[column]}} </td>
          </ng-container>

          <!-- Expanded Content Column -->
          <ng-container matColumnDef="expandedDetail">
            <td mat-cell *matCellDef="let element" [attr.colspan]="columnsToDisplay.length">
              <div class="element-detail"
                   [@detailExpand]="element == expandedElement ? 'expanded' : 'collapsed'">
                <div class="nested-table-container" *ngIf="element == expandedElement">
                  <h3>Details for {{element[displayedColumns[0]]}}</h3>
                  <table class="nested-table">
                    <tr>
                      <th *ngFor="let column of displayedColumns">{{column | titlecase}}</th>
                    </tr>
                    <tr>
                      <td *ngFor="let column of displayedColumns">{{element[column]}}</td>
                    </tr>
                  </table>
                  
                  <div *ngIf="element.details" class="additional-details">
                    <h4>Additional Details</h4>
                    <table class="nested-table">
                      <tr>
                        <th *ngFor="let key of getObjectKeys(element.details)">{{key | titlecase}}</th>
                      </tr>
                      <tr>
                        <td *ngFor="let key of getObjectKeys(element.details)">{{element.details[key]}}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="columnsToDisplay; sticky: true"></tr>
          <tr mat-row *matRowDef="let element; columns: columnsToDisplay;"
              class="element-row"
              [class.expanded-row]="expandedElement === element">
          </tr>
          <tr mat-row *matRowDef="let row; columns: ['expandedDetail']" class="detail-row"></tr>
          
          <!-- Row shown when there is no matching data -->
          <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell" colspan="100">No data matching the filter "{{input.value}}"</td>
          </tr>
        </table>

        <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" aria-label="Select page of items"></mat-paginator>
      </div>
    </div>
  `,
  styles: [`
    .table-container {
      padding: 20px;
    }
    .filter-field {
      width: 100%;
      margin-bottom: 15px;
    }
    table {
      width: 100%;
    }
    tr.detail-row {
      height: 0;
    }
    tr.element-row:not(.expanded-row):hover {
      background: whitesmoke;
      cursor: pointer;
    }
    tr.element-row:not(.expanded-row):active {
      background: #efefef;
    }
    .element-row td {
      border-bottom-width: 0;
    }
    .element-detail {
      overflow: hidden;
      display: flex;
    }
    .nested-table-container {
      padding: 16px;
      width: 100%;
    }
    .nested-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      margin-bottom: 20px;
    }
    .nested-table th, .nested-table td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    .nested-table th {
      background-color: #f2f2f2;
    }
    .additional-details {
      margin-top: 20px;
    }
  `],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericTableComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() displayedColumns: string[] = [];
  
  dataSource!: MatTableDataSource<any>;
  expandedElement: any | null;
  columnsToDisplay: string[] = [];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.initializeTable();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && !changes['data'].firstChange) {
      this.initializeTable();
    }
  }

  private initializeTable() {
    this.dataSource = new MatTableDataSource(this.data);
    // Add expand column to the beginning of displayed columns
    this.columnsToDisplay = ['expand', ...this.displayedColumns];
    
    // If paginator and sort are already defined (after view init)
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleRow(element: any, event: Event) {
    event.stopPropagation();
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}