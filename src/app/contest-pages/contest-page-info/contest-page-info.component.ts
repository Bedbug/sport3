import { Component, OnInit } from '@angular/core';
import { Contest } from 'src/app/models/contest';
import { ActivatedRoute } from '@angular/router';
import { SportimoApiService } from 'src/app/services/sportimoapi.service';
import { trigger, style, transition, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-contest-page-info',
  templateUrl: './contest-page-info.component.html',
  styleUrls: ['./contest-page-info.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition('void => *', [
          query('.card-body', style({opacity: 0})),
          query('.card-body', stagger('200ms', [
              animate('300ms', style({opacity: 1}))
          ]))
      ]),
      transition('* => void', [
          query('.card-body', style({opacity: 1})),
          query('.card-body', stagger('200ms', [
              animate('300ms', style({opacity: 0}))
          ]))
      ])
      ]
    )
  ]
})
export class ContestPageInfoComponent implements OnInit {

  constructor(private route:ActivatedRoute, private SportimoApi:SportimoApiService) { }

  data = {en: `<b>This text is bold</b> and this one is <i>italics</i>`};

  contestDetails: Contest;

  ngOnInit() {

    

    this.route.paramMap.subscribe(params => {      
      this.SportimoApi.getContestQuickDetails(params.get("id"))
      .subscribe(result => {
        this.contestDetails = result
      });
    })
  }

}
