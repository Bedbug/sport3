import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageHomeComponent } from './main-page-home/main-page-home.component';
import { MainPageWinnersComponent } from './main-page-winners/main-page-winners.component';
import { MainPageAchievementsComponent } from './main-page-achievements/main-page-achievements.component';
import { MainPageStandingsComponent } from './main-page-standings/main-page-standings.component';


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
