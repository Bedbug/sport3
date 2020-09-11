import { HostListener,Component, OnInit } from '@angular/core';
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
    private cardToastService: CardToastService,
  ) {
    _("Card_lost_text");
    _("Card_won_text");
    _("Card_lost");
    _("Card_won");
    _("Card_PresetInstant_activated_text");
  
  }

  @HostListener('window:focus', ['$event'])
  onFocus(event: any): void {
    console.log("Focused");
    this.sportimoService.reloadMatch(null)
  }

  @HostListener('window:blur', ['$event'])
  onBlur(event: any): void {
    console.log("Blurred");
  };

  

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

      this.sportimoService.currentLiveMatch.pipe(takeUntil(this.ngUnsubscribe)).subscribe(match => {           
        if (match) {          
          this.liveMatch = match;
          console.log("The current time of the segment is: "+ this.liveMatch.matchData.time);
          
        }
      })
      


      // Retrieve the Live Match data from the service
      this.sportimoService.getMatchDataForUser(this.contestId, this.contestMatchId).
        subscribe(result => {        

          console.log("Initiating Stream sequence");
          
          // Initiating Socket Connection and subscription to stream
          this.stream = this.sportimoService.getStream().subscribe(data => {
            if(this.sportimoService.matchReloading)
                        return;
            let event: any = data;
            console.log("skipped match reloading");
            
            // Check if current route view is info. No need to show Toast if it is
            const isInfo: any = this.state.routerState.snapshot.url.match(/info/i);

            const isCards: any = this.state.routerState.snapshot.url.match(/cards/i);

            if (!isCards && (event.type == "Card_lost" || event.type == "Card_won")) {           

              this.cardToastService.Show({
                type: "card-result",
                icon: this.Utils.getIconBySprite(event.data.image.sprite),
                title: event.data.title[this.translate.currentLang],
                option: this.getFormatedOption(event.data.text[this.translate.currentLang]),
                points: event.data.pointsAwarded ? this.parseNumbers(event.data.pointsAwarded) : this.parseNumbers("0"),
                won: event.data.status == 2 && event.data.pointsAwarded > 0 ? true : false
              });
            }

            if (!isInfo && event) {
              if (event.type == "Event_added") {               
                this.cardToastService.Show({
                  type: "match-event",
                  icon: this.Utils.getIconByType(event.data.type),
                  time: this.Utils.shouldShow(event.data.type, 1) ? event.data.time + "'" : "",
                  event: this.translate.instant(event.data.type),
                  teamKit: this.Utils.shouldShow(event.data.type, 1) ? this.liveMatch.matchData[event.data.team].logo : null
                });


              }
              if (event.type == "Advance_Segment") {
                this.cardToastService.Show({
                  type: "advance_segment",
                  event: this.translate.instant(event.data.sportSegmenInfo.name['en']),
                });
              }
            }
          });
        });

     
        
        // if (/*@cc_on!@*/false) { // check for Internet Explorer
        //   document.onfocusin = onFocus;
        //   document.onfocusout = onBlur;
        // } else {
          // window.onfocus = this.onFocus(this.sportimoService);
          // window.onblur = this.onBlur;
        // }
      // this.demoplay = this.sportimoService.playDemo();
    })
  }

 

  getStatusText(status){
    if(!status)
    return "";
    
    return this.translate.instant(this.Utils.getStatusText(status));
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

    window.onfocus = null;
    window.onblur = null;
  }

  parseNumbers(text: string) {
    if (text)
      return this.Utils.parseNumbers(text, this.translate.currentLang == 'fa');
    else
      return "";
  }

  getFormatedOption(text: string) {
    const home_team = this.sportimoService.getCurrentLiveMatchData().value.matchData.home_team.name[this.translate.currentLang] || this.sportimoService.getCurrentLiveMatchData().value.matchData.home_team.name['en'];
    const away_team = this.sportimoService.getCurrentLiveMatchData().value.matchData.away_team.name[this.translate.currentLang] || this.sportimoService.getCurrentLiveMatchData().value.matchData.away_team.name['en'];
    if (text)
      return text.replace("[[home_team_name]]", home_team).replace('[[away_team_name]]', away_team);
    else return "__missing text";
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
