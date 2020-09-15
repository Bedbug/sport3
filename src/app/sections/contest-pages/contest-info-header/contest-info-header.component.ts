import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SportimoService } from 'src/app/services/sportimo.service';
import { Contest } from 'src/app/models/contest';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorDisplayService } from 'src/app/services/error-display.service';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';
import { debug } from 'util';

@Component({
  selector: 'app-contest-info-header',
  templateUrl: './contest-info-header.component.html',
  styleUrls: ['./contest-info-header.component.scss']
})
export class ContestInfoHeaderComponent implements OnInit {
  isLoggedIn: boolean;
  joiningContest: boolean;
  user: User;
  isJoinRequesting: boolean;
  Utils: SportimoUtils = new SportimoUtils();
  @Input() showContestDetails:boolean = true;
  @Input() showBackButon:boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private sportimoService: SportimoService,
    public translate: TranslateService,
    private errorDisplay: ErrorDisplayService
  ) { }

  contestDetails: Contest;
  ngUnsubscribe = new Subject();
  private contestId: string;


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.sportimoService.getContestDetails(params.get("contestId"))
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(result => {
          this.contestId = params.get("contestId");
          this.contestDetails = result;          
        });
    })

    this.authenticationService.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user => {
      this.isLoggedIn = user != null;
      this.user = user;
      if (this.contestId)
        this.sportimoService.getContestDetails(this.contestId)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(result => {
            this.contestDetails = result;            
          });
    });

    this.sportimoService.contestPointsUpdate.pipe(takeUntil(this.ngUnsubscribe)).subscribe((points)=>{
      // console.log(points);
      this.contestDetails.user_chances += points;
    });

    this.sportimoService.contestPointsSet.pipe(takeUntil(this.ngUnsubscribe)).subscribe((points)=>{
      // console.log(points);
      this.contestDetails.user_chances = points;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getDuration() {
    return 0;
  }

  gotoContest() {
    this.router.navigate(['contest', this.contestDetails._id, 'matches'],{relativeTo:this.route.parent});
  }

  joinContest() {
    if (!this.isLoggedIn)
      this.errorDisplay.showError('101');
    else {
      if (this.joiningContest)
        this.sportimoService.joinContest(this.contestDetails._id).subscribe(x => 
          {            
            // console.log(x)
        }
          );
      else {
        this.joiningContest = true;
      }
    }
  }

  cancel() {
    if (this.isJoinRequesting) return;
    this.joiningContest = false;
  }

  preventDefault(event) {
    event.stopPropagation();
  }

  requestJoin() {

    this.isJoinRequesting = true;
    this.sportimoService.joinContest(this.contestDetails._id).subscribe(x => {      
      this.authenticationService.pay(this.contestDetails.subscriptionPrice);
      this.contestDetails.isSubscribed = true;
      this.isJoinRequesting = false;
      this.cancel();
    });
  }

  getCoins() {

  }

  parseDate(date:string){    
    return this.Utils.parseDate(date,this.translate.currentLang == 'fa',"DD/MM/YY", "jDD/jMM/jYY");
  }

  parseNumbers(text:string){    
    if(!text)
    text = "0";
      return this.Utils.parseNumbers(text,this.translate.currentLang == 'fa');
    // else
    // return "-";
  }
}
