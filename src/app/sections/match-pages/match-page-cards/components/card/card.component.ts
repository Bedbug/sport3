import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  styles: [`
  /deep/ div.bg-card-timer {
    background-color: #ff9900!important; 
  }
`]
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
