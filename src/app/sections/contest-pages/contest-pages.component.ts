import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { slideInAnimation } from 'src/app/animations/route-animations';

@Component({
  selector: 'app-contest-pages',
  templateUrl: './contest-pages.component.html',
  styleUrls: ['./contest-pages.component.scss'],
  animations: [ slideInAnimation ]
})
export class ContestPagesComponent implements OnInit {

  contestId: string = "empty";

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.contestId = params.get("contestId")
    })
  }

}
