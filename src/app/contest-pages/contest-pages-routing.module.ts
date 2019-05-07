import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContestPageInfoComponent} from './contest-page-info/contest-page-info.component';
import { ContestPageMatchesComponent } from './contest-page-matches/contest-page-matches.component';
import { ContestPageLeadersComponent } from './contest-page-leaders/contest-page-leaders.component';
import { ContestPagePrizesComponent } from './contest-page-prizes/contest-page-prizes.component';
import { ContestPagesComponent } from './contest-pages.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'info',
        component: ContestPageInfoComponent
      },
      {
        path: 'matches',
        component: ContestPageMatchesComponent
      },
      {
        path: 'leaders',
        component: ContestPageLeadersComponent
      },
      {
        path: 'prizes',
        component: ContestPagePrizesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestPagesRoutingModule { }
