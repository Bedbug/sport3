import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContestPageInfoComponent} from './contest-page-info/contest-page-info.component';
import { ContestPageMatchesComponent } from './contest-page-matches/contest-page-matches.component';
import { ContestPageLeadersComponent } from './contest-page-leaders/contest-page-leaders.component';
import { ContestPagePrizesComponent } from './contest-page-prizes/contest-page-prizes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'info',
        component: ContestPageInfoComponent,
        data: {animation: 'Home'}
      },
      {
        path: 'matches',
        component: ContestPageMatchesComponent
        ,data: {animation: 'About'}
      },
      {
        path: 'leaders',
        component: ContestPageLeadersComponent
        ,data: {animation: 'Contact'}
      },
      {
        path: 'prizes',
        component: ContestPagePrizesComponent
        ,data: {animation: 'Fourth'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestPagesRoutingModule { }
