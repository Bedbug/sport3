import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchPagesRoutingModule } from './match-pages-routing.module';
import { MatchPageInfoComponent } from './match-page-info/match-page-info.component';
import { MatchPageCardsComponent } from './match-page-cards/match-page-cards.component';
import { MatchPageLeadersComponent } from './match-page-leaders/match-page-leaders.component';
import { StatsComponent } from 'src/app/components/stats/stats.component';
import { NgArrayPipesModule } from 'ngx-pipes';
import { CardComponent } from './match-page-cards/components/card/card.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlaycardComponent } from './match-page-cards/components/playcard/playcard.component';



@NgModule({
  declarations: [
    MatchPageInfoComponent,
    MatchPageCardsComponent,
    MatchPageLeadersComponent,
    StatsComponent,
    CardComponent,
    PlaycardComponent
  ],
  imports: [
    CommonModule,
    MatchPagesRoutingModule,
    NgArrayPipesModule,
    NgbModule
  ]
})
export class MatchPagesModule { }
