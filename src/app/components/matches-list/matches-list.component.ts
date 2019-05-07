import { Component, OnInit, Input } from '@angular/core';
import { ScehduledMatch } from 'src/app/models/scheduled-match';

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.scss']
})
export class MatchesListComponent implements OnInit {

  @Input() matches: ScehduledMatch[];


  constructor() { }

  ngOnInit() {
  }

}
