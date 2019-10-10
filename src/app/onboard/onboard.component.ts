import { Component, OnInit } from '@angular/core';
import {OnBoardService} from './onboard.service';
import { TranslateService } from '@ngx-translate/core';
import { debug } from 'util';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.scss']
})
export class OnboardComponent implements OnInit {

  isFirstGame = true;
  constructor(private onBoardService: OnBoardService, public translate: TranslateService) { }

  ngOnInit() {
    // Get Value From local
    let parsedFirst = parseInt(localStorage.getItem("isFirstGame"));
    if (parsedFirst != null){
      console.log(parsedFirst);
      if(parsedFirst == 1){
        this.onBoardService.Hide();
        console.log("Turning it to False!")
      }
        // this.isFirstGame = false;
      
    } else {
      // this.isFirstGame = true;
      console.log("Turning it to True!")
      this.onBoardService.Show();
    }

    // Get value from Service
    this.onBoardService.onboardModalIsActive.subscribe(x => {
      this.isFirstGame = x;
    });

    // this.isFirstGame = true;
    // localStorage.setItem(key, 'New Value');
    
  }

  closeModal() {
    console.log("Hide");
    localStorage.setItem("isFirstGame", "1");
    this.isFirstGame = false;
    
  }

  nextSlide() {

  }
}
