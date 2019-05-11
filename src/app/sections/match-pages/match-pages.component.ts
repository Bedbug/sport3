import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from 'src/app/animations/route-animations';
import { ActivatedRoute } from '@angular/router';
import { SportimoApiService } from 'src/app/services/sportimoapi.service';
import { LiveMatch } from 'src/app/models/live-match';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-match-pages',
  templateUrl: './match-pages.component.html',
  styleUrls: ['./match-pages.component.scss'],
  animations: [
    slideInAnimation,
      trigger(
        'enterAnimation', [
          transition(':enter', [
            style({transform: 'translateY(-100%)', opacity: 0}),
            animate('500ms', style({transform: 'translateY(0)', opacity: 1}))
          ]),
          transition(':leave', [
            style({transform: 'translateY(0)', opacity: 1}),
            animate('500ms', style({transform: 'translateY(-100%)', opacity: 0}))
          ])
        ])]
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
