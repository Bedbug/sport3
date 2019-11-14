import { Component, OnInit } from '@angular/core';
import { SportimoService } from 'src/app/services/sportimo.service';

@Component({
  selector: 'app-main-page-winners',
  templateUrl: './main-page-winners.component.html',
  styleUrls: ['./main-page-winners.component.scss']
})
export class MainPageWinnersComponent implements OnInit {
  
  winners: any;

  constructor(public sportimoService:SportimoService) { }

  ngOnInit() {
    this.sportimoService.getWinners().subscribe((winners)=>{
      this.winners = winners;
    });
  }

}
