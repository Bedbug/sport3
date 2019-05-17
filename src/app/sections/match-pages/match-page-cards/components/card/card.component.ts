import { Component, OnInit, Input } from '@angular/core';
import { compileBaseDefFromMetadata } from '@angular/compiler';
import { PlayCard } from 'src/app/models/playcard';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';
import { SportimoApiService } from 'src/app/services/sportimoapi.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() cardData: PlayCard;
  sportUtils: SportimoUtils = new SportimoUtils();

  // When user has init process to play a special
  isPlayingSpecial: any;
  playcardSubscription: Subscription;

  getFormatedOption(text: string) {
    const home_team = this.sportimoAPI.getCurrentLiveMatchData().value.matchData.home_team.name['en'];
    const away_team = this.sportimoAPI.getCurrentLiveMatchData().value.matchData.away_team.name['en'];
    return text.replace("[[home_team_name]]", home_team).replace('[[away_team_name]]', away_team);
  }

  constructor(private sportimoAPI: SportimoApiService) { }

  ngOnInit() {
    console.log(this.cardData);
  }

  playSpecial(specialName: string) {
    if (this.isPlayingSpecial) return;

    if (specialName === "doublePoints" && this.cardData.isDoublePoints)
      return;
    if (specialName === "doubleTime" && this.cardData.isDoubleTime)
      return;

    const postData = {};
    postData[specialName] = true;
    this.isPlayingSpecial = true;

    this.playcardSubscription = this.sportimoAPI.playSpecial(this.cardData.id, postData)
      .subscribe(response => {
        console.log(response);
        this.isPlayingSpecial = false;
      });

  }

  ngOnDestroy() {
    if (this.playcardSubscription)
      this.playcardSubscription.unsubscribe();
  }

}
