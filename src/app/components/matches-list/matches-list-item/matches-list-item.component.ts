import { Component, OnInit, Input } from '@angular/core';
import { Match } from 'src/app/models/match';
import { SportimoApiService } from 'src/app/services/sportimoapi.service';
import { map } from 'rxjs/operators';
import { ContestMatch } from 'src/app/models/contest-match';

@Component({
  selector: 'app-matches-list-item',
  templateUrl: './matches-list-item.component.html',
  styleUrls: ['./matches-list-item.component.scss']
})
export class MatchesListItemComponent implements OnInit {

  @Input() contestMatch: ContestMatch;
  @Input() isClickable: boolean;

  constructor(private sportimoApi: SportimoApiService) { }

  ngOnInit() {
  }

  gotoMatch() {
    if (this.isClickable)
      this.sportimoApi.getMatchDataForUser(this.contestMatch.tournament, this.contestMatch._id).
        subscribe(result => console.log(result));


  }

}
