import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contest-pages',
  templateUrl: './contest-pages.component.html',
  styleUrls: ['./contest-pages.component.scss']
})
export class ContestPagesComponent implements OnInit {

  contestId: string = "empty";

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.contestId = params.get("id")
    })
  }

}
