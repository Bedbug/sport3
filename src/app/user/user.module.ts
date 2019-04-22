import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { StarterComponent } from './starter/starter.component';
import { ContestsComponent } from './contests/contests.component';



@NgModule({
  declarations: [
    StarterComponent,
    ContestsComponent
],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
