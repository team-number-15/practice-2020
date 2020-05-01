import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatNavList} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';

const modules = [
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatMenuModule,
  ClipboardModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class MaterialModule {
}
