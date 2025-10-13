import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBar } from './side-bar/side-bar/side-bar';
import { MaterialModule } from '../material/material-module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SideBar
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    SideBar
  ]
})
export class CoreModule { }
