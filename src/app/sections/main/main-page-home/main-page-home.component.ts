import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { ToastrService } from 'ngx-toastr';
import { NotyfToastSuccess } from 'src/app/components/custom-toast/notyf.toast';
import { NotyfToastError } from 'src/app/components/custom-toast/notyf.error';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SportimoService } from 'src/app/services/sportimo.service';
import { TranslateService } from '@ngx-translate/core';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';
import { GrandPrizeDetailsComponent } from '../grand-prize-details/grand-prize-details.component';
import { PrizeViewOverlayService } from '../prize-view-overlay/prize-view-overlay.service';
import { MatchSubscribeComponent } from '../../contest-pages/match-subscribe/match-subscribe.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import UIkit from 'uikit';
import { GsapService } from "src/app/services/gsap.service";

@Component({
  selector: 'app-page',
  templateUrl: './main-page-home.component.html',
  styleUrls: ['./main-page-home.component.scss'],
  animations: [
    trigger(
      'fadein', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('false <=> true', animate(500))
    ]),
  ]
})
export class MainPageHomeComponent implements OnInit {

  contestID: string;

  title = '';
  message = '';
  private lastInserted: number[] = [];
  matchesListVisible = false;
  upcomingMatches: any[];
  ngUnsubscribe = new Subject();
  isAuthenticated = false;
  Utils: SportimoUtils = new SportimoUtils();
  loyaltyImg:any;
  loyaltyText:any;
  dailybonus:number = 10;

  constructor(
    private routeParams: ActivatedRoute,
    private config: ConfigService,
    private toastr: ToastrService,
    private sportimoService: SportimoService,
    public translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private ViewModalOverlay: PrizeViewOverlayService,
    private authenticationService:AuthenticationService,
    private _gsapService: GsapService
  ) {
    this.contestID = routeParams.snapshot.params['contestID'];
  }

  ngOnInit() {
    this.matchesListVisible = false;
    // setTimeout(()=>{this.matchesListVisible = true},1000);

    this.authenticationService.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user => {
      this.isAuthenticated = user!=null;
      console.log("Check Bonus!");
      // user.loyaltyCoins = 2;
      if(this.isAuthenticated && user.loyaltyCoins > 0){
        
        this.showDailyBonusModal(user.loyaltyCoins);
        this.animateShine();
      }
      
    })

    this.sportimoService.getHomeMatches().subscribe(data => {
      // console.log(data);
      this.upcomingMatches = data;
      // this.upcomingMatches.reverse();
      // console.table(this.upcomingMatches);
      // console.table(this.upcomingMatches[0].match);
      this.upcomingMatches.sort((a, b) => (a.match.start > b.match.start) ? 1 : -1);
      // console.table(this.upcomingMatches);
      this.matchesListVisible = true
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  get getUpcoming() {
    if (!this.upcomingMatches)
      return null;

    return this.upcomingMatches.filter(x => x.match.state == 0);
  }

  get getLive() {
    if (!this.upcomingMatches)
      return null;

    return this.upcomingMatches.filter(x => x.match.state > 0);
  }

  openContest(contestId: string, matchId: string) {
    // this.router.navigate([this.config.getClient(), 'contest', contestId, 'matches']);
    // this.router.navigate(['contest', contestId, 'matches']);
    this.router.navigate(['../contest', contestId, 'match', matchId, 'info'], { relativeTo: this.route.parent });
  }

  openUpcomingMatch(upcomingMatch: any) {
    console.log(upcomingMatch);
    if (upcomingMatch.tournament.isSubscribed) {
      console.log("Already subscribed");
      // Handle Match subscription      
      if(upcomingMatch.match.isSubscribed)
      this.router.navigate(['../contest', upcomingMatch.tournament._id, 'match', upcomingMatch._id, 'info'], { relativeTo: this.route.parent });
      else
      this.ViewModalOverlay.open<MatchSubscribeComponent>(MatchSubscribeComponent, {
        data: {
          match: upcomingMatch,
          route: this.route.parent,
          routePath: ['../contest', upcomingMatch.tournament._id, 'match', upcomingMatch._id, 'info']
        }
      });
    } else {
      // Handle contest subscription first
      console.log("We need to subscribe to contest first");

      this.sportimoService.joinContest(upcomingMatch.tournament._id).subscribe(x => {
        console.log(x)
        upcomingMatch.tournament.isSubscribed = true;
        // Reflow
        this.openUpcomingMatch(upcomingMatch);
      });
    }
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
    const inserted = this.toastr.show(title, message, options);
    if (inserted && inserted.toastId) {
      this.lastInserted.push(inserted.toastId);
    }
    return inserted;
  }

  parseDateTime(date: string) {
    return this.Utils.parseDate(date, this.translate.currentLang == 'fa', 'HH:mm', 'HH:mm');
  }

  parseDateDay(date: string) {
    return this.Utils.parseDate(date, this.translate.currentLang == 'fa', 'DD/MM', 'jDD/jMM');
  }

  parseNumbers(text: string) {
    if (!text)
      text = "0";
    return this.Utils.parseNumbers(text, this.translate.currentLang == 'fa');
  }

  ngAfterViewInit() {
    this.checkScroll();
  }

  checkScroll() {
    // let a = $(".scorllable-area");

    // let scroll = a.scrollTop();

    // if (scroll > 100)
    //   $(".grand-prize").addClass('mini');
    // else if (scroll <= 100 && scroll >= 0)
    //   $(".grand-prize").removeClass('mini');
    // if(b.length == 0 || a.length ==0) return;

    // if (b.position().top < a.position().top) {
    //   $(".leaders-table-user").addClass('leaders-table-user-up');
    // } else {
    //   $(".leaders-table-user").removeClass('leaders-table-user-up');
    // }
    // let dist = b.position().top - a.position().top - a.height() + 42;
    // if (dist >0) {
    //   $(".leaders-table-user").addClass('leaders-table-user-down');
    // } else {
    //   $(".leaders-table-user").removeClass('leaders-table-user-down');
    // }
  }

  showDailyBonusModal(value:number) {
    // console.log("Loyalty Bonus from Auth: "+ this.authenticationService.hasDailyBonus);
    this.loyaltyImg = this.sportimoService.getConfigurationFor('userLoyaltySponsorImageUrl');
    this.loyaltyText = this.sportimoService.getConfigurationFor('userLoyaltySponsorText');
    
      this.dailybonus = value;

      console.log("dailybonus property: "+ this.dailybonus);
      
      var dailymodal = UIkit.modal("#dailyModal2", { escClose: false, bgClose: false });
      // dailymodal.show();
      var that = this;
      setTimeout(() => {
        dailymodal.show();
        console.log(that);
        
      }, 2000);
    
    
  }

  collectCoin(){
    // Collect Loyalty
    this.authenticationService.collectLoyalty().subscribe(user => {

    });
    //Close Modal
    let modal = UIkit.modal("#dailyModal2", { escClose: false, bgClose: false });
      modal.hide();
  }

  animateShine(){
    const anim = this._gsapService;

    // Get Shine
    const shine = ".shine";
    const shineOuter = ".shineOuter";
    const coin = ".coinBox";
    
     // Yoyo Scale
    anim.YoyoScale(shineOuter, 0.5, 1.2 , 1.2, 0);
    anim.alphaYoyo(shine, 3, 0.4, 0);
    // anim.YoyoScale(coin, 1, 1.1, 1.1, 1);
    // Rotate
    anim.RotateInf(shine);
   
  }

}
