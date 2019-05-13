import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SportimoApiService } from 'src/app/services/sportimoapi.service';
import { Contest } from 'src/app/models/contest';

@Component({
  selector: 'app-contest-info-header',
  templateUrl: './contest-info-header.component.html',
  styleUrls: ['./contest-info-header.component.scss']
})
export class ContestInfoHeaderComponent implements OnInit {

  constructor(private router: Router, private route:ActivatedRoute, private SportimoApi:SportimoApiService) { }

  contestDetails: Contest;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {      
      this.SportimoApi.getContestQuickDetails(params.get("contestId"))
      .subscribe(result => {
        this.contestDetails = result;
      });
    })
  }

  getDuration(){
    return 0;
  }

  gotoContest(){
    this.router.navigate(['/contest',this.contestDetails._id,'info']);
  }

}
