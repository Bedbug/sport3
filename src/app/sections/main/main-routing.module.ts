import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageHomeComponent } from './main-page-home/main-page-home.component';
import { MainPageWinnersComponent } from './main-page-winners/main-page-winners.component';
import { MainPageAchievementsComponent } from './main-page-achievements/main-page-achievements.component';
import { MainPageStandingsComponent } from './main-page-standings/main-page-standings.component';
import { MainPageMyteamsComponent } from './main-page-myteams/main-page-myteams.component';
import { MainPageProfileComponent } from './main-page-profile/main-page-profile.component';
import { MainPageInboxComponent } from './main-page-inbox/main-page-inbox.component';
import { MainPageAvatarsComponent } from './main-page-avatars/main-page-avatars.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'contests',
        component: MainPageHomeComponent
      },
      {
        path: 'winners',
        component: MainPageWinnersComponent
      },
      {
        path: 'achievements',
        component: MainPageAchievementsComponent
      },
      {
        path: 'standings',
        component: MainPageStandingsComponent
      },
      {
        path: 'myteams',
        component: MainPageMyteamsComponent
      },
      {
        path: 'profile',
        component: MainPageProfileComponent
      },
      {
        path: 'inbox',
        component: MainPageInboxComponent
      },
      {
        path: 'avatars',
        component: MainPageAvatarsComponent
      },
      // {
      //   path: 'standings/league/:leageid',
      //   component: MainPageStandingsComponent
      // },
      {
        path: '*',
        component: MainPageHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
