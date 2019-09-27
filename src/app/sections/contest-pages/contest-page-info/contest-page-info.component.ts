import { Component, OnInit, Inject } from '@angular/core';
import { Contest } from 'src/app/models/contest';
import { ActivatedRoute } from '@angular/router';
import { SportimoService } from 'src/app/services/sportimo.service';
import { trigger, style, transition, animate, query, stagger } from '@angular/animations';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  constructor(
    private route:ActivatedRoute, 
    public sportimoService:SportimoService,
    public translate:TranslateService
    ) { }

  // private langIsRTL: boolean = false;
  ngUnsubscribe = new Subject();
  contestDetails: Contest;
    contestId: string;

  ngOnInit() {
    this.contestId = this.route.snapshot.params['contestId']
    // this.route.paramMap.subscribe(params => {      
      this.sportimoService.getContestQuickDetails(this.contestId).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {
        this.contestDetails = result;
      });
    // })

    // this.langIsRTL = this.sportimoService.langIsRTL;
    // this.translate.onLangChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe((event: LangChangeEvent) => {
    //   this.langIsRTL = this.sportimoService.langIsRTL;
    // });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}
