import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestPagesRoutingModule } from './contest-pages-routing.module';
import { ContestPageInfoComponent } from './contest-page-info/contest-page-info.component';
import { ContestPageLeadersComponent } from './contest-page-leaders/contest-page-leaders.component';
import { ContestPageMatchesComponent } from './contest-page-matches/contest-page-matches.component';
import { ContestPagePrizesComponent } from './contest-page-prizes/contest-page-prizes.component';
import { MatchesListComponent } from 'src/app/components/matches-list/matches-list.component';
import { MatchesListItemComponent } from 'src/app/components/matches-list/matches-list-item/matches-list-item.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ContestPageInfoComponent,
    ContestPageLeadersComponent,
    ContestPageMatchesComponent,
    ContestPagePrizesComponent,
    MatchesListComponent,
    MatchesListItemComponent,
  ],
  imports: [
    CommonModule,
    ContestPagesRoutingModule,
    TranslateModule.forChild()
  ]
})
export class ContestPagesModule { }
