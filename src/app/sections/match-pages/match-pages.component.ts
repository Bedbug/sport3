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

  contestMatchId: string;
  contestId: string;
  liveMatch: LiveMatch;
  stream: any;
  demoplay: any;
  ngUnsubscribe = new Subject();
  
  constructor(
    private route: ActivatedRoute, 
    private sportimoService: SportimoService, 
    private toastr: ToastrService, 
    private state: Router, 
    public translate: TranslateService,
    private authenticationService:AuthenticationService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.contestMatchId = params.get("contestMatchId");
      this.contestId = params.get("contestId");

      this.authenticationService.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user=>{
        if(!user){
          this.state.navigate(['/contest',this.contestId,'info']);
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

            if (!isInfo && event) {
              if (event.type == "Event_added") {
                this.openNotyf("", event.data.type, false);
              }
              if (event.type == "Advance_Segment") {
                this.openNotyf("", event.data.text[this.translate.currentLang], false);
              }
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

  openNotyf(title: string, message: string, error: boolean) {
    let options = this.toastr.toastrConfig;
    // options.timeOut = 0;
    if (error)
      options.toastComponent = NotyfToastError;
    else
      options.toastComponent = NotyfToastSuccess;
    options.toastClass = 'notyf confirm';
    // opt.positionClass = 'notyf__wrapper';
    // this.options.newestOnTop = false;
    this.toastr.show(title, message, options);
  }

}
