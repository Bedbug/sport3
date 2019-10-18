import { Component, OnInit, Input } from '@angular/core';
import { ContestMatch } from 'src/app/models/contest-match';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ErrorDisplayService } from 'src/app/services/error-display.service';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';

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

  constructor(private router:Router, public translate: TranslateService, private errorDisplay:ErrorDisplayService) { }

  ngOnInit() {
  }

  gotoMatch() {
    if (this.isClickable && this.hasJoined)
    this.router.navigate(['/contest',this.contestMatch.tournament,'match',this.contestMatch._id,'info']);   
    else
    this.errorDisplay.showError(102);
  }

  parseDate(date:string){
    return this.Utils.parseDate(date,this.translate.currentLang=='fa','DD/MM/YY, hh:mm');
  }

}
