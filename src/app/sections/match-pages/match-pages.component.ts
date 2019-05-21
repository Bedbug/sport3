import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from 'src/app/animations/route-animations';
import { ActivatedRoute } from '@angular/router';
import { LiveMatch } from 'src/app/models/live-match';
import { trigger, transition, style, animate } from '@angular/animations';
import { SportimoService } from 'src/app/services/sportimo.service';

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

  constructor(private route: ActivatedRoute, private sportimoService: SportimoService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.contestMatchId = params.get("contestMatchId");
      this.contestId = params.get("contestId");

      // Retrieve the Live Match data from the service
      this.sportimoService.getMatchDataForUser(this.contestId, this.contestMatchId).
        subscribe(result => {
          this.liveMatch = result;
          // console.log(this.liveMatch);
        });

      // this.stream = this.sportimoService.getStream().subscribe(x=>{
      //   console.log(x);
      // });

      this.demoplay = this.sportimoService.playDemo();
    })
  }

  get homeScore() {
    if (!LiveMatch)
      return 0;

      if(this.liveMatch.matchData.stats){
        var homeStats = this.liveMatch.matchData.stats.find(x=>x.name =="home_team");
        if(homeStats && homeStats["Goal"])
          return homeStats["Goal"];
      }

      return this.liveMatch.matchData["home_score"];
  }

  get awayScore() {
    if (!LiveMatch)
      return 0;

      if(this.liveMatch.matchData.stats){
        var awayStats = this.liveMatch.matchData.stats.find(x=>x.name =="away_team");
        if(awayStats && awayStats["Goal"])
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
  }

}
