import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SportimoService } from 'src/app/services/sportimo.service';
import { Contest } from 'src/app/models/contest';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router, 
    private route:ActivatedRoute, 
    private sportimoService: SportimoService,
    public translate:TranslateService
    ) { }

  contestDetails: Contest;
  ngUnsubscribe = new Subject();


  ngOnInit() {
    this.route.paramMap.subscribe(params => {      
      this.sportimoService.getContestDetails(params.get("contestId"))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {
        console.log("Contest details changed");
        this.contestDetails = result;
      });
    })

    this.authenticationService.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user=>{
      this.isLoggedIn = user!=null;
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getDuration(){
    return 0;
  }

  gotoContest(){
    this.router.navigate(['/contest',this.contestDetails._id,'info']);
  }

  joinContest(){
    this.joiningContest = true;
  }

  cancel(){
    if(this.isJoinRequesting) return;
    this.joiningContest = false;
  }

  preventDefault(event){
    event.stopPropagation();
  }

  requestJoin(){

    this.isJoinRequesting = true;
    this.sportimoService.joinContest(this.contestDetails._id).subscribe(x=>{
      console.log(x);
      this.authenticationService.pay(this.contestDetails.subscriptionPrice);
      this.contestDetails.isSubscribed = true;
      this.isJoinRequesting = false;
      this.cancel();
    });
  }

  getCoins(){
    
  }
}
