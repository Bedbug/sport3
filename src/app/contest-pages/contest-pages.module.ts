import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestPagesRoutingModule } from './contest-pages-routing.module';
import { ContestPageInfoComponent } from './contest-page-info/contest-page-info.component';
import { ContestPageLeadersComponent } from './contest-page-leaders/contest-page-leaders.component';
import { ContestPageMatchesComponent } from './contest-page-matches/contest-page-matches.component';
import { ContestPagePrizesComponent } from './contest-page-prizes/contest-page-prizes.component';
import { MatchesListComponent } from '../components/matches-list/matches-list.component';


@NgModule({
  declarations: [
    ContestPageInfoComponent,
    ContestPageLeadersComponent,
    ContestPageMatchesComponent,
    ContestPagePrizesComponent,
    MatchesListComponent
  ],
  imports: [
    CommonModule,
    ContestPagesRoutingModule
  ]
})
export class ContestPagesModule { }
