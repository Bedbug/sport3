import { Component, OnInit } from '@angular/core';
import { ToppickService } from './toppick.service';
import { SportimoService } from 'src/app/services/sportimo.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-toppick',
  templateUrl: './toppick.component.html',
  styleUrls: ['./toppick.component.scss']
})
export class ToppickComponent implements OnInit {

  topPickModalisActive: boolean = true;
  recentform = ["W", "L", "L", "T", "W"];
  pastMatches: any;
  topScorers: any;
  upcoming: any;

  constructor(
    private topPickService: ToppickService,
    private sportimoService: SportimoService,
    public translate: TranslateService,
  ) { }

  ngOnInit() {
    this.topPickService.topPickModalIsActive.subscribe(x => {
      this.topPickModalisActive = x;
      
      if (this.topPickModalisActive == true) {
        this.sportimoService.getYesterdayGames()
          .subscribe(data => {
            if (data != null && data.length > 0) {
              this.pastMatches = data;
           
            }
          })

        this.sportimoService.getTopScorers()
          .subscribe(data => {
            if (data != null && data.length > 0) {
              this.topScorers = data;
           
            }
          })

        this.sportimoService.getUpcoming()
          .subscribe(data => {
            if (data != null && data.length > 0) {
              this.upcoming = data;
             
            }
          })
      }

    })

    // this.checkDailyDisplay();
  }

  Onscroll(){

  }

  closeModal() {
    console.log("Hide");

    this.topPickService.Hide();
    $('body').removeClass('modal-open');
  }

  checkDailyDisplay() {
    localStorage.removeItem("last_picks_check");
    const lastDayViewed = localStorage.getItem("last_picks_check");
    const todayDate = new Date().getDate().toString();
    if(lastDayViewed != todayDate){
      this.topPickService.Show();
      $('body').addClass('modal-open');
      localStorage.setItem("last_picks_check",todayDate);
    }      
  }

}
