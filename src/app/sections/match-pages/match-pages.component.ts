import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from 'src/app/animations/route-animations';
import { ActivatedRoute, UrlSegment, RouterStateSnapshot, Router } from '@angular/router';
import { LiveMatch } from 'src/app/models/live-match';
import { trigger, transition, style, animate } from '@angular/animations';
import { SportimoService } from 'src/app/services/sportimo.service';
import { ToastrService } from 'ngx-toastr';
import { NotyfToastError } from 'src/app/components/custom-toast/notyf.error';
import { NotyfToastSuccess } from 'src/app/components/custom-toast/notyf.toast';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CardToastService } from 'src/app/components/card-toast/card-toast.service';
import { debug } from 'util';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

@Component({
  selector: 'app-match-pages',
  templateUrl: './match-pages.component.html',
  styleUrls: ['./match-pages.component.scss'],
  animations: [
    slideInAnimation,
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('500ms ease-in-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ])
    ])]
})
export class MatchPagesComponent implements OnInit {
  Utils: SportimoUtils = new SportimoUtils();
  contestMatchId: string;
  contestId: string;
  liveMatch: LiveMatch;
  stream: any;
  demoplay: any;
  ngUnsubscribe = new Subject();
  showPlayCardsPop = false;
  hasJoinedContest: string;

  constructor(
    private route: ActivatedRoute,
    private sportimoService: SportimoService,
    private state: Router,
    public translate: TranslateService,
    private authenticationService: AuthenticationService,
    private cardToastService: CardToastService

  ) {
    _("Card_lost_text");
    _("Card_won_text");
    _("Card_PresetInstant_activated_text");
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.contestMatchId = params.get("contestMatchId");
      this.contestId = params.get("contestId");

      this.hasJoinedContest = localStorage.getItem("hasplayedcard");
      this.showPlayCardsPop = !this.hasJoinedContest;

      this.authenticationService.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user => {
        if (!user && this.contestId) {
          this.state.navigate(['/contest', this.contestId, 'info']);
        }
      });

      // Retrieve the Live Match data from the service
      this.sportimoService.getMatchDataForUser(this.contestId, this.contestMatchId).
        subscribe(result => {
          this.liveMatch = result;

          // Initiating Socket Connection and subscription to stream
          this.stream = this.sportimoService.getStream().subscribe(data => {
            let event: any = data;

            // Check if current route view is info. No need to show Toast if it is
            const isInfo: any = this.state.routerState.snapshot.url.match(/info/i);

            const isCards: any = this.state.routerState.snapshot.url.match(/cards/i);

            if (!isInfo && event) {
              if (event.type == "Event_added") {
                this.cardToastService.Show({
                  icon: this.Utils.getIconByType(event.data.type),
                  time: this.Utils.shouldShow(event.type, 1) ? event.data.time + "'" : "",
                  event: this.translate.instant(event.data.type),
                  teamKit: this.Utils.shouldShow(event.type, 1) ? this.liveMatch.matchData[event.data.team].logo : null
                });
              }
            if (!isCards && (event.type == "Card_lost" || event.type == "Card_won" || event.type == "Card_PresetInstant_activated")) {


                this.cardToastService.Show({
                  icon: null,
                  time: "",
                  event: this.translate.instant(event.type + "_text"),
                  teamKit: null
                });

              }
              // if (event.type == "Advance_Segment") {
              //   // this.openNotyf("", event.data.text[this.translate.currentLang], false);
              //              console.log(event.data);
              //   this.cardToastService.Show({
              //     icon:"",
              //     time: "",
              //     event: this.translate.instant(event.data.sportSegmenInfo.name['en']),
              //     teamKit: ""
              //   });
              // }
            }
          });
        });

      // this.demoplay = this.sportimoService.playDemo();
    })
  }

  get homeScore() {
    if (!LiveMatch)
      return 0;

    if (this.liveMatch.matchData.stats) {
      var homeStats = this.liveMatch.matchData.stats.find(x => x.name == "home_team");
      if (homeStats && homeStats["Goal"])
        return homeStats["Goal"];
    }

    return this.liveMatch.matchData["home_score"];
  }

  get awayScore() {
    if (!LiveMatch)
      return 0;

    if (this.liveMatch.matchData.stats) {
      var awayStats = this.liveMatch.matchData.stats.find(x => x.name == "away_team");
      if (awayStats && awayStats["Goal"])
        return awayStats["Goal"];
    }

    return this.liveMatch.matchData["away_score"];
  }

  ngOnDestroy() {
    if (this.stream)
      this.stream.unsubscribe();
    if (this.demoplay)
      this.demoplay.unsubscribe();

    // Clears current Match Data in order for the new view to be clean if necessary
    this.sportimoService.clearMatch();

    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  parseNumbers(text:string){
    if(text)
    return this.Utils.parseNumbers(text,this.translate.currentLang == 'fa');
    else
    return "";
  }
  
  // openNotyf(title: string, message: string, error: boolean) {
  //   let options = this.toastr.toastrConfig;
  //   // options.timeOut = 0;
  //   // if (error)
  //   //   options.toastComponent = NotyfToastError;
  //   // else
  //   //   options.toastComponent = NotyfToastSuccess;
  //   // options.toastClass = 'notyf confirm';
  //   // opt.positionClass = 'notyf__wrapper';
  //   // this.options.newestOnTop = false;
  //   this.toastr.info(title, message, options);
  // }

}
