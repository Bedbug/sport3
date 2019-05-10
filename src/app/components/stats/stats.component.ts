import { Component, OnInit, Input } from '@angular/core';
import { LiveMatch } from 'src/app/models/live-match';
import { SportimoApiService } from 'src/app/services/sportimoapi.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  homeKit: string;
  awayKit: string;
  liveMatch: LiveMatch;

  constructor(private sportimoApi: SportimoApiService) { }

  ngOnInit() {
    this.sportimoApi.getCurrentLiveMatchData().subscribe(match => {
      if (match) {
        this.liveMatch = match;
        this.homeKit = match.matchData.home_team.logo;
        this.awayKit = match.matchData.away_team.logo;
      }
    })
  }

  getStat(team: string, stat: string) {
    if (!this.liveMatch)
      return 0;

    let teamObject = this.liveMatch.matchData.stats.find(x => x.name == team);
    return teamObject[stat] | 0;
  }

}
