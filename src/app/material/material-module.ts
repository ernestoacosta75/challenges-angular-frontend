import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
	  MatCardModule,
	  MatInputModule,
	  MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,  
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule
  ]
})
export class MaterialModule { }
