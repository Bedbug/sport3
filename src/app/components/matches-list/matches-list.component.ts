import { Component, OnInit, Input } from '@angular/core';
import { ContestMatch } from 'src/app/models/contest-match';
import * as moment from 'moment';

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.scss']
})
export class MatchesListComponent implements OnInit {

  @Input() present: ContestMatch[];
  @Input() past: ContestMatch[];
  
  

  constructor() { }

  ngOnInit() {
  }

  get liveMatches(){
    return this.present.filter(x => x.match.state > 0 && !x.match.completed);
  }

  get upcomingMatches(){
    const today = moment().utc().toDate();
    
    return this.present.filter(x=>{
      return moment(x.match.start).utc().toDate() > today;
    });
  }

  get pastMatches(){
    return this.past;
  }
}
