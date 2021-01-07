import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-main-page-faq',
  templateUrl: './main-page-faq.component.html',
  styleUrls: ['./main-page-faq.component.scss'],
  animations: [
    trigger(
      'staggerAnimation', [
        transition('* => *', [
          query(':enter', style({ opacity: 0 }), { optional: true }),
          query(
            ':enter',
            stagger(
              '100ms', [
                animate('200ms', style({ opacity: 1 }))
              ]), { optional: true })
              ,
          // query(':leave', 
          //   animate('100ms', style({ opacity: 0 }))
          // )
        ]),
      ]
    )
  ]
})
export class MainPageFAQComponent implements OnInit {

  tags = [];
  filteredData = [];
  selectedTag = null;
  data = [
    {
      category: "Cards",
      categoryTitle:{
        en:"Cards"
      },
      question:{
        en:"[Cards] How do I join a contest?"
      },
      answer: {
        en:"<b> this is the begining</b>"
      }
    },
    {
      category: "Coins",
      categoryTitle:{
        en:"Coins"
      },
      question:{
        en:"[Coins] This is a really large question that shou exceed a single line. So here it is. How do I join a contest?"
      },
      answer: {
        en:"<b> this is the begining</b>"
      }
    },
    {
      category: "Coins",
      categoryTitle:{
        en:"Coins"
      },
      question:{
        en:"[Coins] This is a really large question that shou exceed a single line. So here it is. How do I join a contest?"
      },
      answer: {
        en:"<b> this is the begining</b>"
      }
    },
    {
      category: "Coins",
      categoryTitle:{
        en:"Coins"
      },
      question:{
        en:"[Coins] This is a really large question that shou exceed a single line. So here it is. How do I join a contest?"
      },
      answer: {
        en:"<b> this is the begining</b>"
      }
    },
    {
      category: "Matches",
      categoryTitle:{
        en:"Matches"
      },
      question:{
        en:"[Matches] How do I join a contest?"
      },
      answer: {
        en:"<b> this is the begining</b>"
      }
    },
    {
      category: "Matches",
      categoryTitle:{
        en:"Matches"
      },
      question:{
        en:"[Matches] How do I join a contest?"
      },
      answer: {
        en:"<b> this is the begining</b>"
      }
    },
    {
      category: "Matches",
      categoryTitle:{
        en:"Matches"
      },
      question:{
        en:"[Matches] How do I join a contest?"
      },
      answer: {
        en:"<b> this is the begining</b>"
      }
    },
    {
      category: "Gameplay",
      categoryTitle:{
        en:"Gameplay"
      },
      question:{
        en:"[Gameplay] How do I join a contest?"
      },
      answer: {
        en:"<b> this is the begining</b>"
      }
    }
    ,
    {
      category: "Prizes",
      categoryTitle:{
        en:"Prizes"
      },
      question:{
        en:"[Prizes] How do I join a contest?"
      },
      answer: {
        en:"<b> this is the begining</b>"
      }
    }
  ]
  animate: boolean;

  constructor(   public translate: TranslateService) { }

  ngOnInit() {
    // this.tags = [...new Set(this.data.map(item => {item.category,item.categoryTitle}))];
    this.tags = _.uniqBy(this.data, "category");
    this.filteredData = this.data;
    console.log(this.tags);    
  }

  toggleTag(tag:string){
    if(tag == this.selectedTag){
      this.selectedTag = null;
    }else{
      this.selectedTag = tag;
    }

    this.FilterData();
    this.animate = !this.animate;
  }

  FilterData() {
    if(this.selectedTag){
      this.filteredData = _.filter(this.data, {'category': this.selectedTag});
    }else{
      this.filteredData = this.data;
    }
  }

}
