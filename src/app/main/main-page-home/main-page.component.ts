import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import{ConfigService } from '../../services/config.service'

@Component({
  selector: 'app-page',
  templateUrl: './main-page-home.component.html',
  styleUrls: ['./main-page-home.component.scss']
})
export class MainPageHomeComponent implements OnInit {

  contestID: string;
  
  
  constructor(private routeParams: ActivatedRoute, private config:ConfigService) { 
    this.contestID = routeParams.snapshot.params['contestID'];
    console.log(config.getClient(), this.contestID);
  }

  ngOnInit() {
      
  }

}
