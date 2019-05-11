import { Component, OnInit } from '@angular/core';
import { SportimoApiService } from 'src/app/services/sportimoapi.service';
import { LiveMatch } from 'src/app/models/live-match';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-match-page-info',
  templateUrl: './match-page-info.component.html',
  styleUrls: ['./match-page-info.component.scss'],
  animations: [
      trigger(
        'enterAnimation', [
          transition(':enter', [
            style({transform: 'translateY(100%)', opacity: 0}),
            animate('500ms', style({transform: 'translateY(0)', opacity: 1}))
          ]),
          transition(':leave', [
            style({transform: 'translateY(0)', opacity: 1}),
            animate('500ms', style({transform: 'translateY(100%)', opacity: 0}))
          ])
        ])]
})
export class MatchPageInfoComponent implements OnInit {

  liveMatch: LiveMatch;

  events_mapping = {
    "Shot_on_Goal": { text: "Shot on Target", icon: "icn-shot", show:true },
    "First_Half_Starts": { text: "First Half Starts" },
    "Offside": { text: "Offside", icon: "icn-offside", show:true },
    "First_Half_Ends": { text: "First Half Ends" },
  }

  constructor(private sportimoApi: SportimoApiService) { }

  ngOnInit() {
    this.sportimoApi.getCurrentLiveMatchData().subscribe(match => {
      if (match) {
        this.liveMatch = match;
      }
    })
  }

  getTextByType(type: string) {
    return this.events_mapping[type].text;
  }
  getIconByType(type: string) {
    return this.events_mapping[type].icon;
  }
  getKitByTeam(team: string) {
    if (!this.liveMatch || !team)
      return "";
    return this.liveMatch.matchData[team].logo;
  }
  shouldShow(type: string, data: any) {
    if (this.events_mapping[type].show)
      return data;
    else
      return null;
  }

}
