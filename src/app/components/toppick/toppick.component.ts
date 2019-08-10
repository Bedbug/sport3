import { Component, OnInit } from '@angular/core';
import { ToppickService } from './toppick.service';

@Component({
  selector: 'app-toppick',
  templateUrl: './toppick.component.html',
  styleUrls: ['./toppick.component.scss']
})
export class ToppickComponent implements OnInit {
  
  topPickModalisActive: boolean = true;
  recentform = ["W", "L", "L", "T", "W"];

  constructor(
    private topPickService: ToppickService
  ) { }

  ngOnInit() {
    this.topPickService.topPickModalIsActive.subscribe(x=>{
      this.topPickModalisActive = x;
    })

    console.log("Show");
    this.topPickService.Show();   
  }

  closeModal() {    
    console.log("Hide");
    
    this.topPickService.Hide();
  }

}
