import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, query, stagger } from '@angular/animations';
import { Subject } from 'rxjs';
import { SportimoService } from 'src/app/services/sportimo.service';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-main-page-news',
  templateUrl: './main-page-news.component.html',
  styleUrls: ['./main-page-news.component.scss'],
  providers: [DatePipe],
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
  hasMore: boolean;
  lastArticleId: string;
  alignAllLeft = true;
  myDate = new Date();
  // Button Properties
  isLoading = false;

  constructor(private sportimoService: SportimoService,
    private router: Router,
    public translate: TranslateService,
    private authenticationService: AuthenticationService,
    private datePipe: DatePipe) {

  }

  ngOnInit() {
    this.isLoading = true;
    this.sportimoService.getNews()
      .subscribe(data => {
        this.news = data.results;
        // console.table(this.news);
        this.hasMore = data.hasMorePages;
        this.lastArticleId = this.news[this.news.length - 1]._id;
        this.isLoading = false;
        // console.log(this.myDate);
        // console.log(this.news[1].publishDate);
        // console.log(this.myDate.toDateString());
        // var isToday = (this.myDate.toDateString() == this.news[1].publishDate);
        
        // console.log("Today Date: "+ this.parseDate(this.myDate.toDateString()) );

        // console.log("Article Date: "+ this.parseDate(this.news[1].publishDate) );

        var isToday = (this.parseDate(this.myDate.toDateString()) >  this.parseDate(this.news[1].publishDate));
        // console.log("Today > Article Date: "+isToday);
      })



    if (this.translate.currentLang == "ar" || this.translate.currentLang == "fa") {
      this.alignAllLeft = false;
    } else {
      this.alignAllLeft = true;
    }

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // do something
      // console.log(event.lang);
      if (this.translate.currentLang == "ar" || this.translate.currentLang == "fa") {
        this.alignAllLeft = false;
      } else {
        this.alignAllLeft = true;
      }
    });

    // console.log("Align Left: " + this.alignAllLeft);
  }

  loadMore() {
    this.isLoading = true;
    this.sportimoService.getMoreNews(this.lastArticleId)
      .subscribe(data => {
        this.news.push(...data.results);
        this.hasMore = data.hasMorePages;
        this.lastArticleId = this.news[this.news.length - 1]._id;
        // console.log(this.lastArticleId);
        this.isLoading = false;
      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  CheckDate(date: string) {
    // console.log(this.parseDate(this.myDate.toDateString()) >  this.parseDate(date)); 
    return this.parseDate(this.myDate.toDateString()) >  this.parseDate(date);
  }

  parseDate(date: string) {
    return this.Utils.parseDate(date, this.translate.currentLang == 'fa', 'DD/MM/YY, hh:mm');
  }

  parseNumbers(text: string) {
    if (!text)
      text = "0";
    return this.Utils.parseNumbers(text, this.translate.currentLang == 'fa');
  }

  cancel() {
    this.selectedArticle = null;
  }

  strippedArticleText(text: string) {
    if (text) {
      return text.replace(/<\/?[^>]+(>|$)/g, "");
    } else
      return "";
  }


}
