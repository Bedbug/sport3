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
import { ChartsModule } from 'ng2-charts';
import { MainPageAvatarsComponent } from './main-page-avatars/main-page-avatars.component';
import { MainPageNewsComponent } from './main-page-news/main-page-news.component';
import { SafeHTMLPipe } from 'src/app/pipes/safe-html.pipe';


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
    MainPageInboxComponent,
    MainPageAvatarsComponent,
    MainPageNewsComponent,
    // OnboardComponent,
    SafeHTMLPipe
],
  imports: [
    CommonModule,
    MainRoutingModule,
    TranslateModule.forChild(),
    FormsModule,
    NgxChartsModule,
    ChartsModule
  ]
})
export class MainModule { }
