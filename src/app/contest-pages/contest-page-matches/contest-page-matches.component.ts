import { Component, OnInit } from '@angular/core';
import { ScehduledMatch } from 'src/app/models/scheduled-match';

@Component({
  selector: 'app-contest-page-matches',
  templateUrl: './contest-page-matches.component.html',
  styleUrls: ['./contest-page-matches.component.scss']
})
export class ContestPageMatchesComponent implements OnInit {

  loadedMatches: ScehduledMatch[] = [
    {id:"1",title:"Match 1", live: true},
    {id:"2",title:"Match 2", live: false},
    {id:"3",title:"Match 3", live: false}
  ]
  constructor() { }

  ngOnInit() {
  }

}
