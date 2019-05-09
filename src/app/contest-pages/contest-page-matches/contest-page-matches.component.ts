import { Component, OnInit } from '@angular/core';
import { ScehduledMatch } from 'src/app/models/scheduled-match';
import * as moment from 'moment';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-contest-page-matches',
  templateUrl: './contest-page-matches.component.html',
  styleUrls: ['./contest-page-matches.component.scss']
})
export class ContestPageMatchesComponent implements OnInit {

  loadedMatches: ScehduledMatch[] = [
    {id:"1",title:"Match 1", home_score:3, away_score: 1, live: true,  start: moment().toDate()},
    {id:"2",title:"Match 2", home_score:0, away_score: 0, live: false, start: moment().add(1,'days').toDate()},
    {id:"3",title:"Match 3", home_score:0, away_score: 0, live: false, start: moment().add(-1,'days').add(2 ,'hours').toDate()}
  ]
  
  constructor() { }

  ngOnInit() {
  
            timer(5000, 5000).pipe(
             take(2)).subscribe(x=>{
              this.loadedMatches[0].away_score++; 
              })
  
  }

}
