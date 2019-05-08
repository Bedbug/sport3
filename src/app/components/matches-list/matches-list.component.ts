import { Component, OnInit, Input } from '@angular/core';
import { ScehduledMatch } from 'src/app/models/scheduled-match';

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.scss']
})
export class MatchesListComponent implements OnInit {

  @Input() matches: ScehduledMatch[];
  today = new Date();
  

  constructor() { }

  ngOnInit() {
  }

  get liveMatches(){
    return this.matches.filter(x => x.live);
  }

  get upcomingMatches(){
    return this.matches.filter(x=>x.start > this.today);
  }
}
