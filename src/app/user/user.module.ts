import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './starter/user.component';
import { ContestsComponent } from './contests/contests.component';

@NgModule({
  declarations: [
    UserComponent,
    ContestsComponent
],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
