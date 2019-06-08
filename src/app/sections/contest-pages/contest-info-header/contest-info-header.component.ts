import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SportimoService } from 'src/app/services/sportimo.service';
import { Contest } from 'src/app/models/contest';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';

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
    private sportimoService: SportimoService,
    private translate:TranslateService
    ) { }

  contestDetails: Contest;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {      
      this.sportimoService.getContestDetails(params.get("contestId"))
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
