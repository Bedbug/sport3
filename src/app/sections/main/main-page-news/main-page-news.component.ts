import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, query, stagger } from '@angular/animations';
import { Subject } from 'rxjs';
import { SportimoService } from 'src/app/services/sportimo.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';

@Component({
  selector: 'app-main-page-news',
  templateUrl: './main-page-news.component.html',
  styleUrls: ['./main-page-news.component.scss'],
  animations: [
    trigger(
      'staggerAnimation', [
        transition('* => *', [
          query(':enter', style({ opacity: 0 }), { optional: true }),
          query(
            ':enter',
            stagger(
              '200ms', [
                animate('300ms', style({ opacity: 1 }))
              ]), { optional: true }),
          query(':leave', stagger('200ms', [
            animate('300ms', style({ opacity: 0 }))
          ]), { optional: true })
        ]),
      ]
    )
  ]
})
export class MainPageNewsComponent implements OnInit {

  news: any[];
  ngUnsubscribe = new Subject();
  Utils: SportimoUtils = new SportimoUtils();
  selectedArticle = null;

  constructor(private sportimoService: SportimoService,
    private router: Router,
    public translate: TranslateService,
    private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.sportimoService.getNews()
    .subscribe(data => {
      this.news = data;
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  parseDate(date:string){
    return this.Utils.parseDate(date,this.translate.currentLang=='fa','DD/MM/YY, hh:mm');
  }

  parseNumbers(text:string){
    return this.Utils.parseNumbers(text,this.translate.currentLang == 'fa');
  }

  cancel() {
    this.selectedArticle = null;
  }

  strippedArticleText(text:string) {
    if (text){      
      return text.replace(/<\/?[^>]+(>|$)/g, "");
    }else
      return "";
  }


}
