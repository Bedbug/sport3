import { Component, OnInit } from '@angular/core';
import { Contest } from 'src/app/models/contest';
import { SportimoApiService } from 'src/app/services/sportimoapi.service';

@Component({
  selector: 'app-contests-list',
  templateUrl: './contests-list.component.html',
  styleUrls: ['./contests-list.component.scss']
})
export class ContestsListComponent implements OnInit {

  contests: Contest[];

  constructor(private SportimoApi: SportimoApiService) { }

  ngOnInit() {
    this.SportimoApi.getContests()
    .subscribe(data=>{
      this.contests = data;
    })
  }

}
