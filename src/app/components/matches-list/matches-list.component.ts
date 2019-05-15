import { Component, OnInit, Input } from '@angular/core';
import { ContestMatch } from 'src/app/models/contest-match';
import * as moment from 'moment';
import { trigger, transition, stagger, animate, style, query } from '@angular/animations';


@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.scss'],
  animations:[
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query('.match-item:leave', [
          stagger(500, [
            animate('0.5s 1s', style({ opacity: 0 }))
          ])
        ],{ optional: true }),
        query('.match-item:enter', [
          style({ opacity: 0 }),
          stagger(500, [
            animate('0.5s 1s', style({ opacity: 0 }))
          ])
        ],{ optional: true })
      ])
    ])
  ]
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
