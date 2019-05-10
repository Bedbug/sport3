import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchPageInfoComponent } from './match-page-info/match-page-info.component';
import { MatchPageCardsComponent } from './match-page-cards/match-page-cards.component';
import { MatchPageLeadersComponent } from './match-page-leaders/match-page-leaders.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'info',
        component: MatchPageInfoComponent,
        data: {animation: 'Home'}
      },
      {
        path: 'cards',
        component: MatchPageCardsComponent,
        data: {animation: 'About'}
      },
      {
        path: 'leaders',
        component: MatchPageLeadersComponent,
        data: {animation: 'Contact'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchPagesRoutingModule { }
