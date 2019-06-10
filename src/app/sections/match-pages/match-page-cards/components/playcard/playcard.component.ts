import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { PlayCard } from 'src/app/models/playcard';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';
import { utils } from 'protractor';
import { SportimoService } from 'src/app/services/sportimo.service';
import { TranslateService } from '@ngx-translate/core';

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
  playCardModal: boolean = false;
  selectedTime: number = 1;
  cardSelections: any = {};
  isSubmitingCard: boolean = false;
  minTimeValue: number = 1; 


  openPlayModal(){
    this.selectedTime = this.getMinimumTime();
    this.playCardModal = true;
  }

  closeModal() {
    if (this.isSubmitingCard) return;
    this.playCardModal = false;
  }

  valueChanged(e) {
    this.selectedTime = e;
  }

  get SelectedTime() {
    if (this.selectedTime == this.minTimeValue && this.sportimoService.currentMatch.matchData.state > 0 )
      return "Now";
    else
      return this.selectedTime + "'";
  }

  getMinimumTime() {
    this.minTimeValue = this.sportimoService.currentMatch.matchData.time;
    if(this.minTimeValue == null || this.minTimeValue ==0) this.minTimeValue = 1;
    return this.minTimeValue;
  }

  getFormatedOption(optionText: string) {
    const home_team = this.sportimoService.currentMatch.matchData.home_team.name[this.translate.currentLang];
    const away_team = this.sportimoService.currentMatch.matchData.away_team.name[this.translate.currentLang];
    return optionText.replace("[[home_team_name]]", home_team).replace('[[away_team_name]]', away_team);
  }

  cancelAll() {
    this.cardSelections.isDoublePoints = false;
    this.cardSelections.isDoubleTime = false;
    this.cardSelections.optionId = null;
    this.isSubmitingCard = false;
  }

  optionSelect(option: string) {
    this.cardSelections.optionId = option;
    this.cardSelections.gamecardDefinitionId = this.data._id;
  }

  get optionSelected() {
    return this.data.options.find(x => x.optionId == this.cardSelections.optionId)
  }

  submitCard() {
    this.isSubmitingCard = true;
    this.cardSelections.minute = this.selectedTime;
    this.sportimoService.submitUserCard(this.cardSelections)
      .subscribe(playedCard => {
        console.log(playedCard);
        this.isSubmitingCard = false;
        this.closeModal();
      }
        , error => console.log('Could not load todos.'))
  }

  constructor(private sportimoService: SportimoService, public translate: TranslateService) {

  }

  ngOnInit() {
    
    this.selectedTime = this.getMinimumTime();
  }


}
