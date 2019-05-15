import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { PlayCard } from 'src/app/models/playcard';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';
import { utils } from 'protractor';
import { SportimoApiService } from 'src/app/services/sportimoapi.service';

@Component({
  selector: 'app-playcard',
  templateUrl: './playcard.component.html',
  styleUrls: ['./playcard.component.scss'],
  animations: [
    trigger(
      'fadein', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('300ms', style({ opacity: 1 }))
        ]),
        // transition(':leave', [
        //   style({ opacity: 1}),
        //   animate('500ms', style({opacity: 0}))
        // ])
      ]
    )
  ]
})
export class PlaycardComponent implements OnInit {

  @Input() data: PlayCard;
  Utils: SportimoUtils = new SportimoUtils();

  playcardModal: boolean = false;
  selectedTime: number = 1;
  optionSelected: boolean = false;

  valueChanged(e) {
    this.selectedTime = e;
  }

  get SelectedTime() {
    if (this.selectedTime == 1)
      return "Now";
    else
      return this.selectedTime + "'";
  }

  getMinimumTime() {
    return 1;
  }

  getFormatedOption(optionText: string) {
    const home_team = this.sportimoAPI.getCurrentLiveMatchData().value.matchData.home_team.name['en'];
    const away_team = this.sportimoAPI.getCurrentLiveMatchData().value.matchData.away_team.name['en'];
    return optionText.replace("[[home_team_name]]", home_team).replace('[[away_team_name]]', away_team);
  }

  cancelAll() {
    this.data.isDoublePoints = false;
    this.data.isDoubleTime = false;
    this.optionSelected = false;
  }
  constructor(private sportimoAPI: SportimoApiService) {
    
  }

  ngOnInit() {
    // if (this.data.isDoublePoints == undefined)
    //   this.data.isDoublePoints = false;
    // if (this.data.isDoubleTime == undefined)
    //   this.data.isDoubleTime = false;
  }

}
