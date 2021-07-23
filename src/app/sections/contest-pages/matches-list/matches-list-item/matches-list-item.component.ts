import { Component, OnInit, Input } from '@angular/core';
import { ContestMatch } from 'src/app/models/contest-match';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ErrorDisplayService } from 'src/app/services/error-display.service';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';
import { PrizeViewOverlayService } from 'src/app/sections/main/prize-view-overlay/prize-view-overlay.service';
import { MatchSubscribeComponent } from '../../match-subscribe/match-subscribe.component';
import { SportimoService } from 'src/app/services/sportimo.service';
import { FilePreviewOverlayRef } from 'src/app/sections/main/prize-view-overlay/prize-preview-overlay-ref';

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
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private errorDisplay: ErrorDisplayService,
    private sportimoService: SportimoService,
    private ViewModalOverlay: PrizeViewOverlayService) { }

  ngOnInit() {
    // console.log(this.contestMatch);

  }

  gotoMatch() {
    if (this.isClickable && this.hasJoined) {
      console.log(this.contestMatch);

      this.router.navigate(['match', this.contestMatch._id, 'info'], { relativeTo: this.route.parent });
    }

    else
      this.errorDisplay.showError(102);
  }

  joinMatch(match: ContestMatch) {
    if (!match.match.completed && !match.isSubscribed) {
      if (match.subscriptionPrice > 0) {
        this.ViewModalOverlay.open<MatchSubscribeComponent>(MatchSubscribeComponent, { data: { match: match, route: this.route.parent } });
      }
      else
        this.sportimoService.joinMatch(this.contestMatch.tournament, this.contestMatch._id).subscribe(x => {
          if (x.match) {
            this.router.navigate(['match', this.contestMatch._id, 'info'], { relativeTo: this.route.parent });
          }
        });
    } else
      if (match.isSubscribed) {
        console.log(this.contestMatch);
        if (this.contestMatch.match.state < 4)
          this.router.navigate(['match', this.contestMatch._id, 'play'], { relativeTo: this.route.parent });
        else
          this.router.navigate(['match', this.contestMatch._id, 'info'], { relativeTo: this.route.parent });
      }
      else
        this.errorDisplay.showError(102);
  }

  getStatusText(status) {
    if (!status)
      return "";

    return this.translate.instant(this.Utils.getStatusText(status));
  }

  parseDate(date: string, format: string, jaliformat: string) {
    return this.Utils.parseDate(date, this.translate.currentLang == 'fa', format, jaliformat);
  }

  parseNumbers(text: string) {
    if (!text)
      text = "0";
    return this.Utils.parseNumbers(text, this.translate.currentLang == 'fa');
  }

}
