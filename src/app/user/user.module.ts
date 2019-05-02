import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { StarterComponent } from './starter/starter.component';
import { HomeComponent } from './home/home.component';
import { ContestsListComponent } from '../shared/contests-list/contests-list.component';



@NgModule({
  declarations: [
    StarterComponent,
    HomeComponent,
    ContestsListComponent 
],
  imports: [
    CommonModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
