import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { StarterComponent } from './starter/starter.component';
import { HomeComponent } from './home/home.component';
import { ContestsListComponent } from './contests-list/contests-list.component';
import { GrandPrizeComponent } from './grand-prize/grand-prize.component';



@NgModule({
  declarations: [
    StarterComponent,
    HomeComponent,
    ContestsListComponent,
    GrandPrizeComponent
],
  imports: [
    CommonModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
