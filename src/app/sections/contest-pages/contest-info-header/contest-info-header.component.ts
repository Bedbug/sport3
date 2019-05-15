import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SportimoApiService } from 'src/app/services/sportimoapi.service';
import { Contest } from 'src/app/models/contest';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-contest-info-header',
  templateUrl: './contest-info-header.component.html',
  styleUrls: ['./contest-info-header.component.scss']
})
export class ContestInfoHeaderComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(
    private authenticationService: AuthenticationService,private router: Router, 
    private route:ActivatedRoute, 
    private SportimoApi:SportimoApiService
    ) { }

  contestDetails: Contest;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {      
      this.SportimoApi.getContestDetails(params.get("contestId"))
      .subscribe(result => {
        this.contestDetails = result;
      });
    })

    this.authenticationService.currentUser.subscribe(user=>{
      this.isLoggedIn = user!=null;
    });
  }

  getDuration(){
    return 0;
  }

  gotoContest(){
    this.router.navigate(['/contest',this.contestDetails._id,'info']);
  }

}
