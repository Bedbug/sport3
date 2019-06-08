import { Component, OnInit, Input } from '@angular/core';
import { ContestMatch } from 'src/app/models/contest-match';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-matches-list-item',
  templateUrl: './matches-list-item.component.html',
  styleUrls: ['./matches-list-item.component.scss']
})
export class MatchesListItemComponent implements OnInit {

  @Input() contestMatch: ContestMatch;
  @Input() isClickable: boolean;



  constructor(private router:Router, private translate: TranslateService) { }

  ngOnInit() {
  }

  gotoMatch() {
    if (this.isClickable)
    this.router.navigate(['/contest',this.contestMatch.tournament,'match',this.contestMatch._id,'info']);   
  }

}
