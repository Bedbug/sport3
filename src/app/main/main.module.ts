import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { StarterComponent } from './starter/starter.component';
import { MainPageHomeComponent } from './main-page-home/main-page.component';
import { ContestsListComponent } from './contests-list/contests-list.component';
import { GrandPrizeComponent } from './grand-prize/grand-prize.component';
import { MainPageAchievementsComponent } from './main-page-achievements/main-page-achievements.component';
import { MainPageStandingsComponent } from './main-page-standings/main-page-standings.component';
import { MainPageWinnersComponent } from './main-page-winners/main-page-winners.component';



@NgModule({
  declarations: [
    StarterComponent,
    MainPageHomeComponent,
    MainPageAchievementsComponent,
    MainPageStandingsComponent,
    MainPageWinnersComponent,
    ContestsListComponent,
    GrandPrizeComponent
],
  imports: [
    CommonModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
