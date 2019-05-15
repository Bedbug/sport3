import { Component, OnInit } from '@angular/core';
import { SportimoApiService } from 'src/app/services/sportimoapi.service';
import { LiveMatch } from 'src/app/models/live-match';
import { trigger, transition, style, animate } from '@angular/animations';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';

@Component({
  selector: 'app-match-page-info',
  templateUrl: './match-page-info.component.html',
  styleUrls: ['./match-page-info.component.scss'],
  animations: [
      trigger(
        'enterAnimation', [
          transition(':enter', [
            style({transform: 'translateY(100%)', opacity: 0}),
            animate('500ms 500ms ease-out', style({transform: 'translateY(0)', opacity: 1}))
          ]),
          transition(':leave', [
            style({transform: 'translateY(0)', opacity: 1}),
            animate('500ms', style({transform: 'translateY(100%)', opacity: 0}))
          ])
        ])]
})
export class MatchPageInfoComponent implements OnInit {
  Utils:SportimoUtils = new SportimoUtils();
  liveMatch: LiveMatch;

  constructor(private sportimoApi: SportimoApiService) { }

  ngOnInit() {
    this.sportimoApi.getCurrentLiveMatchData().subscribe(match => {
      if (match) {
        this.liveMatch = match;
      }
    })
  }

  getKitByTeam(team: string) {
    if (!this.liveMatch || !team)
      return "";
    return this.liveMatch.matchData[team].logo;
  }


}
