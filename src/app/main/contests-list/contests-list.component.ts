import { Component, OnInit } from '@angular/core';
import { Contest } from 'src/app/models/contest';
import { SportimoApiService } from 'src/app/services/sportimoapi.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-contests-list',
  templateUrl: './contests-list.component.html',
  styleUrls: ['./contests-list.component.scss'],
})
export class ContestsListComponent implements OnInit {

  contests: Contest[];

  constructor(private SportimoApi: SportimoApiService, private router: Router) { }

  ngOnInit() {
    this.SportimoApi.getContests()
    .subscribe(data=>{
      this.contests = data;
    })
  }

  ContestClicked(contestId){
    // this.router.navigate(['/contest',contestId,'info']);
  }

  OnKeyUp(event:any){
    console.log(event);
  }

  OnKeyDown(event:any){
    console.log(event);
  }

}
