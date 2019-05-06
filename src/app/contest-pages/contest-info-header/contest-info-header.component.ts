import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SportimoApiService } from 'src/app/services/sportimoapi.service';
import { Contest } from 'src/app/models/contest';

@Component({
  selector: 'app-contest-info-header',
  templateUrl: './contest-info-header.component.html',
  styleUrls: ['./contest-info-header.component.scss']
})
export class ContestInfoHeaderComponent implements OnInit {

  constructor(private route:ActivatedRoute, private SportimoApi:SportimoApiService) { }

  contestDetails: Contest;

  ngOnInit() {
    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.service.getHero(params.get('id')))
    // );

    this.route.paramMap.subscribe(params => {      
      this.SportimoApi.getContestQuickDetails(params.get("id"))
      .subscribe(result => {
        this.contestDetails = result
        console.log(this.contestDetails);
      });
    })
  }

  getDuration(){
    return 0;
  }

}
