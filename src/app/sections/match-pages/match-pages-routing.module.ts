import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchPageInfoComponent } from './match-page-info/match-page-info.component';
import { MatchPageCardsComponent } from './match-page-cards/match-page-cards.component';
import { MatchPageLeadersComponent } from './match-page-leaders/match-page-leaders.component';
import { MatchPagePlayComponent } from './match-page-play/match-page-play.component';

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
        path: 'play',
        component: MatchPagePlayComponent,
        data: {animation: 'About'}
      },
      {
        path: 'cards',
        component: MatchPageCardsComponent,
        data: {animation: 'Contact'}
      },
      {
        path: 'leaders',
        component: MatchPageLeadersComponent,
        data: {animation: 'Fourth'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchPagesRoutingModule { }
