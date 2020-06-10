import { Component, OnInit, TemplateRef } from '@angular/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import { LiveMatch } from 'src/app/models/live-match';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ErrorDisplayService } from 'src/app/services/error-display.service';

@Component({
  selector: 'app-match-page-info',
  templateUrl: './match-page-info.component.html',
  styleUrls: ['./match-page-info.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateY(100%)', opacity: 0 }),
          animate('500ms 500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateY(0)', opacity: 1 }),
          animate('500ms', style({ transform: 'translateY(100%)', opacity: 0 }))
        ])
      ]),

    trigger('items', [
      transition('* => false', [
        style({ transform: 'scale(0.5)', height: '0px', opacity: 0 }),  // initial
        animate('300ms cubic-bezier(.59,.59,.2,1.5)',
          style({ transform: 'scale(1)', opacity: 1, height: '59px' }))  // final
      ]),
      transition('* => true', [
        style({ transform: 'scale(0.5)', height: '0px', opacity: 0 }),  // initial
        animate('400ms cubic-bezier(.59,.59,.2,1.5)',
          style({ transform: 'scale(1)', opacity: 1, height: '100px' }))  // final
      ])
    ]),

    trigger(
      'fadein', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('300ms')
        ]),
        state('*', style({ opacity: 1 })),
        // transition(':leave', [
        //   style({ opacity: 1}),
        //   animate('500ms', style({opacity: 0}))
        // ])
      ]
    )
  ]
})
export class MatchPageInfoComponent implements OnInit {
  Utils: SportimoUtils = new SportimoUtils();
  liveMatch: LiveMatch;
  ngUnsubscribe = new Subject();

  constructor(
    private sportimoService: SportimoService,
    public translate: TranslateService,
    private modalService: BsModalService,
    private errorService: ErrorDisplayService
  ) { }

  ngOnInit() {
    this.sportimoService.getCurrentLiveMatchData().pipe(takeUntil(this.ngUnsubscribe)).subscribe(match => {
      if (match) {
        this.liveMatch = match;
      }
    })
  }

  isSegment(type: string) {
    return type.match(/Starts|Ends/i)
  }
  get timelineEvents() {
    var xarray = this.liveMatch.matchData.timeline.map(x => x.events);
    var flattenReversed = [].concat(...xarray).reverse();
    return flattenReversed;
    // return this.liveMatch.matchData.timeline.map(x=> x.events.map(x=> x)).slice().reverse();
  }

  showEventTime = null;

  showCardDetails(id:string){
    this.showEventTime = id;
    setTimeout(()=>{
      this.showEventTime = null;
    },5000);
  }


  getKitByTeam(team: string) {
    if (!this.liveMatch || !team)
      return "";
    return this.liveMatch.matchData[team].logo;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  modalRef: BsModalRef;
  config = {
    animated: true
  };

  initiated: boolean = false;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  startingDemo: boolean = false;
  startedDemo: boolean = false;
  confirm() {    
    this.initiated = true;
    this.modalRef.hide();
    this.startingDemo = true;
    this.sportimoService.startDemo().subscribe(response => {  
      this.startingDemo = false;
      this.startedDemo = true;
    },
    error=>{      
      if(error.status == 403)
      this.errorService.showError(103);
      this.startingDemo = false;
      this.startedDemo = false;
      })
  }

  decline() {    
    this.initiated = false;
    this.modalRef.hide();
  }

}
