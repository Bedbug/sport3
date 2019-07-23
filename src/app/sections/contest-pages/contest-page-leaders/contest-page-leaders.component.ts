import { Component, OnInit } from '@angular/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Contest } from 'src/app/models/contest';
import { Subject } from 'rxjs';
import $ from 'jquery'

@Component({
  selector: 'app-contest-page-leaders',
  templateUrl: './contest-page-leaders.component.html',
  styleUrls: ['./contest-page-leaders.component.scss']
})
export class ContestPageLeadersComponent implements OnInit {
  cellArray = [
    // { _id: "" },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: true },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
    // { user: false },
  ];
  show: boolean;
  
  constructor(private route: ActivatedRoute, private sportimoService: SportimoService, private authenticationService: AuthenticationService) { }
  
  userRank: Number = 0;
  contestDetails: Contest;
  ngUnsubscribe = new Subject();

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.sportimoService.getContestQuickDetails(params.get("contestId")).pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(result => {
          this.contestDetails = result;
          if (this.contestDetails)
            this.sportimoService.getContestLeaders(this.contestDetails._id).subscribe(leaders => {        
              this.cellArray = leaders;
              
              // console.table(this.athenticationService.currentUser);
              // console.log("User Id: "+this.athenticationService.currentUser.source._value.id);
              // if(this.athenticationService.currentUser != null) {
              //   this.userRank = this.cellArray.findIndex(x=>x._id == this.athenticationService.currentUser.source._value.id);
              // }
              this.authenticationService.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user=>{             
                this.userRank = this.cellArray.findIndex(x=>x._id == user._id);                
                if(this.userRank >= 0)
                    this.show = true;
              })
            }
            );
        });
    })
    
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngAfterViewInit(){
    this.checkScroll();
  }

  checkScroll() {
    let a = $(".leaders-scrollable-group");
    let b = $('.leaders-user');

    if(b.length == 0 || a.length ==0) return;
    
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
