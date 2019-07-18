import { Component, OnInit } from '@angular/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import { ActivatedRoute } from '@angular/router';
import { Contest } from 'src/app/models/contest';
import $ from 'jquery'
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
  constructor(private route: ActivatedRoute, private sportimoService: SportimoService) { }
  
  userRank: Number;
  contestDetails: Contest;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.sportimoService.getContestQuickDetails(params.get("contestId"))
        .subscribe(result => {
          this.contestDetails = result;
          if (this.contestDetails)
            this.sportimoService.getContestLeaders(this.contestDetails._id).subscribe(leaders => {
              console.table(leaders);
              
              this.cellArray = leaders;
              console.log(this.cellArray.length);
              this.userRank = this.cellArray.findIndex(x=>x.user) + 1;
            }
            );
        });
    })
    
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
    let dist = b.position().top - a.position().top - a.height() + 42;
    if (dist >0) {
      $(".leaders-table-user").addClass('leaders-table-user-down');
    } else {
      $(".leaders-table-user").removeClass('leaders-table-user-down');
    }
  }
}
