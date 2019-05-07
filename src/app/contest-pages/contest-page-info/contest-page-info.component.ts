import { Component, OnInit } from '@angular/core';
import { Contest } from 'src/app/models/contest';
import { ActivatedRoute } from '@angular/router';
import { SportimoApiService } from 'src/app/services/sportimoapi.service';

@Component({
  selector: 'app-contest-page-info',
  templateUrl: './contest-page-info.component.html',
  styleUrls: ['./contest-page-info.component.scss']
})
export class ContestPageInfoComponent implements OnInit {

  constructor(private route:ActivatedRoute, private SportimoApi:SportimoApiService) { }

  data = {en: `<b>This text is bold</b> and this one is <i>italics</i>`};

  contestDetails: Contest;

  ngOnInit() {

    

    this.route.paramMap.subscribe(params => {      
      this.SportimoApi.getContestQuickDetails(params.get("id"))
      .subscribe(result => {
        this.contestDetails = result
      });
    })
  }

}
