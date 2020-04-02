import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { ToastrService } from 'ngx-toastr';
import { NotyfToastSuccess } from 'src/app/components/custom-toast/notyf.toast';
import { NotyfToastError } from 'src/app/components/custom-toast/notyf.error';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SportimoService } from 'src/app/services/sportimo.service';
import { TranslateService } from '@ngx-translate/core';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';
import { GrandPrizeDetailsComponent } from '../grand-prize-details/grand-prize-details.component';


@Component({
  selector: 'app-page',
  templateUrl: './main-page-home.component.html',
  styleUrls: ['./main-page-home.component.scss'],
  animations: [
    trigger(
      'fadein', [
        state('true', style({ opacity: 1 })),
        state('false', style({ opacity: 0 })),
        transition('false <=> true', animate(500))
      ]),
  ]
})
export class MainPageHomeComponent implements OnInit {

  contestID: string;

  title = '';
  message = '';
  private lastInserted: number[] = [];
  matchesListVisible = false;
  upcomingMatches:any[];

  Utils: SportimoUtils = new SportimoUtils();

  constructor(
    private routeParams: ActivatedRoute, 
    private config: ConfigService, 
    private toastr: ToastrService,
    private sportimoService:SportimoService,
    public translate: TranslateService,
    private router: Router,
   
    ) {
    this.contestID = routeParams.snapshot.params['contestID'];
  }

  ngOnInit() {
    this.matchesListVisible = false;
    // setTimeout(()=>{this.matchesListVisible = true},1000);
    this.sportimoService.getHomeMatches().subscribe(data=>{
      // console.log(data);
      this.upcomingMatches = data;
      this.matchesListVisible = true
    })
  }

  get getUpcoming () {
    if(!this.upcomingMatches)
    return null;

    return this.upcomingMatches.filter(x=>x.match.state == 0);
  }
  
  get getLive () {
    if(!this.upcomingMatches)
    return null;

    return this.upcomingMatches.filter(x=>x.match.state > 0);
  }

  openContest(contestId: string){
// console.log(contestId);
this.router.navigate(['/contest', contestId, 'matches']);
  }

  openNotyf(title: string, message: string, error: boolean) {
    let options = this.toastr.toastrConfig;
    // options.timeOut = 0;
    if (error)
      options.toastComponent = NotyfToastError;
    else
      options.toastComponent = NotyfToastSuccess;
    options.toastClass = 'notyf confirm';
    // opt.positionClass = 'notyf__wrapper';
    // this.options.newestOnTop = false;
    const inserted = this.toastr.show(title, message, options);
    if (inserted && inserted.toastId) {
      this.lastInserted.push(inserted.toastId);
    }
    return inserted;
  }

  parseDateTime(date:string){
    return this.Utils.parseDate(date,this.translate.currentLang=='fa','HH:mm', 'jHH:jmm');
  }

  parseDateDay(date:string){
    return this.Utils.parseDate(date,this.translate.currentLang=='fa','DD/MM','jDD/jMM');
  }

  parseNumbers(text:string){
    return this.Utils.parseNumbers(text,this.translate.currentLang == 'fa');
  }

  ngAfterViewInit(){
    this.checkScroll();
  }

  checkScroll() {
    let a = $(".scorllable-area");
   
    // console.log(a.scrollTop());
    let scroll = a.scrollTop();

    if(scroll>5)
    $(".grand-prize").addClass('mini');
    else if(scroll<=5)
    $(".grand-prize").removeClass('mini');
    // if(b.length == 0 || a.length ==0) return;
    
    // if (b.position().top < a.position().top) {
    //   $(".leaders-table-user").addClass('leaders-table-user-up');
    // } else {
    //   $(".leaders-table-user").removeClass('leaders-table-user-up');
    // }
    // let dist = b.position().top - a.position().top - a.height() + 42;
    // if (dist >0) {
    //   $(".leaders-table-user").addClass('leaders-table-user-down');
    // } else {
    //   $(".leaders-table-user").removeClass('leaders-table-user-down');
    // }
  }

}
