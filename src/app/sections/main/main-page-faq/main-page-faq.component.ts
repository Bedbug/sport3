import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-main-page-faq',
  templateUrl: './main-page-faq.component.html',
  styleUrls: ['./main-page-faq.component.scss']
})
export class MainPageFAQComponent implements OnInit {

  tags = [];
  filteredData = [];
  selectedTag = "Coins";
  data = [
    {
      category: "Cards",
      categoryTitle:{
        en:"Cards"
      },
      question:{
        en:"How do I join a contest?"
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
        en:"This is a really large question that shou exceed a single line. So here it is. How do I join a contest?"
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
        en:"How do I join a contest?"
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
        en:"How do I join a contest?"
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
        en:"How do I join a contest?"
      },
      answer: {
        en:"<b> this is the begining</b>"
      }
    }
  ]

  constructor(   public translate: TranslateService) { }

  ngOnInit() {
    // this.tags = [...new Set(this.data.map(item => {item.category,item.categoryTitle}))];
    this.tags = _.uniq(this.data, "category");
    this.filteredData = this.data;
    console.log(this.tags);    
  }

  toggleTag(tag:string){
    if(tag == this.selectedTag){
      this.selectedTag = null;
    }else{
      this.selectedTag = tag;
    }

  }

}
