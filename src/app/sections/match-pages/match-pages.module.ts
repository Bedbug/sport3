import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchPagesRoutingModule } from './match-pages-routing.module';
import { MatchPageInfoComponent } from './match-page-info/match-page-info.component';
import { MatchPageCardsComponent } from './match-page-cards/match-page-cards.component';
import { MatchPageLeadersComponent } from './match-page-leaders/match-page-leaders.component';
import { StatsComponent } from 'src/app/components/stats/stats.component';
// import { NgArrayPipesModule } from 'ngx-pipes';
import { CardComponent } from './match-page-cards/components/card/card.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlaycardComponent } from './match-page-cards/components/playcard/playcard.component';
import { ReversePipe } from 'src/app/pipes/reverse.pipe';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    MatchPageInfoComponent,
    MatchPageCardsComponent,
    MatchPageLeadersComponent,
    StatsComponent,
    CardComponent,
    PlaycardComponent,
    ReversePipe
  ],
  imports: [
    CommonModule,
    MatchPagesRoutingModule,
    // NgArrayPipesModule,
    NgbModule,
    TranslateModule.forChild()
  ]
})
export class MatchPagesModule { }
