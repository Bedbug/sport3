import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchPagesRoutingModule } from './match-pages-routing.module';
import { MatchPageInfoComponent } from './match-page-info/match-page-info.component';
import { MatchPageCardsComponent } from './match-page-cards/match-page-cards.component';
import { MatchPageLeadersComponent } from './match-page-leaders/match-page-leaders.component';
import { StatsComponent } from 'src/app/components/stats/stats.component';
import { CardComponent } from './match-page-cards/components/card/card.component'
// import { PlaycardComponent } from './match-page-cards/components/playcard/playcard.component';
import { ReversePipe } from 'src/app/pipes/reverse.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { IonRangeSliderModule } from "src/app/components/ion-range-slider";
import { MatchPagePlayComponent } from './match-page-play/match-page-play.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalPowersInfoComponent } from './match-page-cards/components/modal-powers-info/modal-powers-info.component';


@NgModule({
  declarations: [
    MatchPageInfoComponent,
    MatchPageCardsComponent,
    MatchPageLeadersComponent,
    MatchPagePlayComponent,
    StatsComponent,
    CardComponent,
    // PlaycardComponent,
    ReversePipe,
    
  ],
  imports: [
    CommonModule,
    MatchPagesRoutingModule,
    PopoverModule.forRoot(),
    // NgArrayPipesModule,
    // NgbModule,
    TranslateModule.forChild(),
    IonRangeSliderModule
  ]
})
export class MatchPagesModule { }
