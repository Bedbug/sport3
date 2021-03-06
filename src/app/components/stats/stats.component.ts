import { Component, OnInit, Input } from '@angular/core';
import { LiveMatch } from 'src/app/models/live-match';
import { SportimoService } from 'src/app/services/sportimo.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  animations:[
    trigger('valueChange',[
      transition('* => *', [
        style({ transform: 'scale(1)', color: 'white'}),  // initial
        animate('200ms ease-out',  keyframes([
          style({ transform: 'scale(1.4)',color: 'yellow' , offset:0.7}),  // final
          style({ transform: 'scale(1)', color:'white', offset:1})  // final
        ])
      )
    ])
  ])]
})
export class StatsComponent implements OnInit {

  homeKit: string;
  awayKit: string;
  liveMatch: LiveMatch;
  Utils: SportimoUtils = new SportimoUtils();

  constructor(private sportimoService: SportimoService,public translate: TranslateService,) { }

  ngOnInit() {
    this.sportimoService.getCurrentLiveMatchData().subscribe(match => {
     
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
    if (teamObject)
      return this.parseNumbers(teamObject[stat]) || this.parseNumbers("0");
    else
      return this.parseNumbers("0");
  }

  parseNumbers(text:string){
    // console.log(text);
    if(!text)
    text = "0";
    return this.Utils.parseNumbers(text,this.translate.currentLang == 'fa');
  }

}
