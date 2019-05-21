import { Component, OnInit } from '@angular/core';
import { Contest } from 'src/app/models/contest';
import { ActivatedRoute } from '@angular/router';
import { SportimoService } from 'src/app/services/sportimo.service';
import { trigger, style, transition, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-contest-page-info',
  templateUrl: './contest-page-info.component.html',
  styleUrls: ['./contest-page-info.component.scss'],
  animations: [
    trigger(
      'staggerAnimation', [
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

  constructor(private route:ActivatedRoute, private sportimoService:SportimoService) { }

  contestDetails: Contest;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {      
      this.sportimoService.getContestQuickDetails(params.get("contestId"))
      .subscribe(result => {
        this.contestDetails = result;
      });
    })
  }

}
