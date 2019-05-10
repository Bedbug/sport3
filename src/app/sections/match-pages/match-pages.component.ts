import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from 'src/app/animations/route-animations';
import { ActivatedRoute } from '@angular/router';
import { SportimoApiService } from 'src/app/services/sportimoapi.service';
import { LiveMatch } from 'src/app/models/live-match';

@Component({
  selector: 'app-match-pages',
  templateUrl: './match-pages.component.html',
  styleUrls: ['./match-pages.component.scss'],
  animations: [slideInAnimation]
})
export class MatchPagesComponent implements OnInit {

  contestMatchId: string;
  contestId: string;
  liveMatch: LiveMatch;

  constructor(private route: ActivatedRoute, private sportimoApi: SportimoApiService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.contestMatchId = params.get("contestMatchId");
      this.contestId = params.get("contestId");
      
      // Retrieve the Live Match data from the service
      this.sportimoApi.getMatchDataForUser(this.contestId, this.contestMatchId).
        subscribe(result => {
          this.liveMatch = result;
          console.log(this.liveMatch);
        });
    })
  }

}
