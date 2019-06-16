import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainPageHomeComponent } from './main-page-home/main-page-home.component';
import { ContestsListComponent } from './contests-list/contests-list.component';
import { GrandPrizeComponent } from './grand-prize/grand-prize.component';
import { MainPageAchievementsComponent } from './main-page-achievements/main-page-achievements.component';
import { MainPageStandingsComponent } from './main-page-standings/main-page-standings.component';
import { MainPageWinnersComponent } from './main-page-winners/main-page-winners.component';
import { TranslateModule } from '@ngx-translate/core';
import { MainPageMyteamsComponent } from './main-page-myteams/main-page-myteams.component';
import { MainPageProfileComponent } from './main-page-profile/main-page-profile.component';
import { MainPageInboxComponent } from './main-page-inbox/main-page-inbox.component';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    MainPageHomeComponent,
    MainPageAchievementsComponent,
    MainPageStandingsComponent,
    MainPageWinnersComponent,
    ContestsListComponent,
    GrandPrizeComponent,
    MainPageMyteamsComponent,
    MainPageProfileComponent,
    MainPageInboxComponent
],
  imports: [
    CommonModule,
    MainRoutingModule,
    TranslateModule.forChild(),
    FormsModule,
    NgxChartsModule
  ]
})
export class MainModule { }
