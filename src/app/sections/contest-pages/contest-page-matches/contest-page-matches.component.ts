import { Component, OnInit } from '@angular/core';
import { ContestMatch } from 'src/app/models/contest-match';
import { SportimoService } from 'src/app/services/sportimo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contest-page-matches',
  templateUrl: './contest-page-matches.component.html',
  styleUrls: ['./contest-page-matches.component.scss']
})
export class ContestPageMatchesComponent implements OnInit {

  contestId: string;

  presentMatches: ContestMatch[] = [
    // {id:"1",title:"Match 1", home_score:3, away_score: 1, live: true,  start: moment().toDate()},
    // {id:"2",title:"Match 2", home_score:0, away_score: 0, live: false, start: moment().add(1,'days').toDate()},
    // {id:"3",title:"Match 3", home_score:0, away_score: 0, live: false, start: moment().add(-1,'days').add(2 ,'hours').toDate()}
  ]

  pastMatches: ContestMatch[] = [
    // { id: "1", title: "Match 1", home_score: 3, away_score: 1, live: true, start: moment().toDate() },
    // { id: "2", title: "Match 2", home_score: 0, away_score: 0, live: false, start: moment().add(1, 'days').toDate() },
    // { id: "3", title: "Match 3", home_score: 0, away_score: 0, live: false, start: moment().add(-1, 'days').add(2, 'hours').toDate() }
  ]

  constructor(private route: ActivatedRoute, private sportimoService: SportimoService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.contestId = params.get("contestId");
      this.sportimoService.getPresentMatches(this.contestId).subscribe(matches => this.presentMatches = matches);
      this.sportimoService.getPastMatches(this.contestId).subscribe(matches => this.pastMatches = matches);
    });
  }
}
