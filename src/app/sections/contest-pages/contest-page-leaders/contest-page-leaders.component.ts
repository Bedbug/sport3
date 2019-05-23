import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contest-page-leaders',
  templateUrl: './contest-page-leaders.component.html',
  styleUrls: ['./contest-page-leaders.component.scss']
})
export class ContestPageLeadersComponent implements OnInit {
  cellArray = [
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: true },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
  ];
  constructor() { }
  userRank: Number;
  ngOnInit() {
    this.userRank = this.cellArray.findIndex(x=>x.user) + 1;
  }

  ngAfterViewInit(){
    this.checkScroll();
  }

  checkScroll() {
    let a = $(".leaders-scrollable-group");
    let b = $('.leaders-user');

    if (b.position().top < a.position().top) {
      $(".leaders-table-user").addClass('leaders-table-user-up');
    } else {
      $(".leaders-table-user").removeClass('leaders-table-user-up');
    }
    // console.log("height:"+ (a.height())+" | "+ a.scrollTop()+" | "+b.position().top)
    // let el = $('.leaders-user');
    // if(el)
    // console.log();
    let dist = b.position().top - a.position().top - a.height() + 42;
    if (dist >0) {
      $(".leaders-table-user").addClass('leaders-table-user-down');
    } else {
      $(".leaders-table-user").removeClass('leaders-table-user-down');
    }
    // console.log(dist)
    // let offset = $('.leaders-user').position().top;
  }
}
