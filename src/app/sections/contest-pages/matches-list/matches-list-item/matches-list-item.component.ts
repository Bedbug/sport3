import { Component, OnInit, Input } from '@angular/core';
import { ContestMatch } from 'src/app/models/contest-match';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ErrorDisplayService } from 'src/app/services/error-display.service';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';
import { PrizeViewOverlayService } from 'src/app/sections/main/prize-view-overlay/prize-view-overlay.service';
import { MatchSubscribeComponent } from '../../match-subscribe/match-subscribe.component';

@Component({
  selector: 'app-matches-list-item',
  templateUrl: './matches-list-item.component.html',
  styleUrls: ['./matches-list-item.component.scss']
})
export class MatchesListItemComponent implements OnInit {

  @Input() contestMatch: ContestMatch;
  @Input() isClickable: boolean;
  @Input() hasJoined: boolean;
  Utils: SportimoUtils = new SportimoUtils();

  constructor(
    private router:Router,
    private route: ActivatedRoute,
     public translate: TranslateService,
      private errorDisplay:ErrorDisplayService,
      private ViewModalOverlay: PrizeViewOverlayService) { }

  ngOnInit() {
    // console.log(this.contestMatch);
    
  }

  gotoMatch() {
    if (this.isClickable && this.hasJoined)
    this.router.navigate(['match',this.contestMatch._id,'info'],{relativeTo:this.route.parent});   
    else
    this.errorDisplay.showError(102);
  }

  joinMatch(match:ContestMatch){    
    if(!match.match.completed && !match.isSubscribed)
    this.ViewModalOverlay.open<MatchSubscribeComponent>(MatchSubscribeComponent,{data:match});
    else
    if(match.isSubscribed)
    this.router.navigate(['match',this.contestMatch._id,'info'],{relativeTo:this.route.parent});
    else
    this.errorDisplay.showError(102);
  }

  getStatusText(status){
    if(!status)
    return "";
    
    return this.translate.instant(this.Utils.getStatusText(status));
  }

  parseDate(date:string){
    return this.Utils.parseDate(date,this.translate.currentLang=='fa','DD/MM/YY, hh:mm');
  }

  parseNumbers(text:string){
    return this.Utils.parseNumbers(text,this.translate.currentLang == 'fa');
  }

}
