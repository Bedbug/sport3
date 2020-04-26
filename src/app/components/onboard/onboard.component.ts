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

  Onboarding = false;
  LandingPage = false;

  public defaults = {
    sequence:["S","L"],
    slides: [
      {
        state: true,
        text: "localizedText",
        image: "localImageName"
      },
      {
        state: true,
        text: "",
        image: ""
      },
      {
        state: true,
        text: "",
        image: ""
      },
      {
        state: true,
        text: "",
        image: ""
      }
    ],
    landingPage:{
      background:"",
      terms:"localizedText",
      slidesShow:[
        {
          header:"localizedText",
          image: "imageUrl",
          prizeText:"localizedText"
        }
      ]
    }
  }

  constructor(private onBoardService: OnBoardService, public translate: TranslateService) { }

  ngOnInit() {
    // Get Value From local
    // let parsedFirst = parseInt(localStorage.getItem("isFirstGame"));
    // if (parsedFirst != null){
    
    //   if(parsedFirst == 1){
        this.onBoardService.Hide();
    //   }           
    // } else {      
    //   this.onBoardService.Show();
    // }

    // Get value from Service
    this.onBoardService.onboardModalIsActive.subscribe(x => {
      this.Onboarding = x;     
      console.log("--- Onboarding");
      
      this.defaults = this.onBoardService.defaults;
    });

    // this.isFirstGame = true;
    // localStorage.setItem(key, 'New Value');
    
  }

  closeOnBoarding() {   
    localStorage.setItem("isFirstGame", "1");
    this.Onboarding = false;
    this.LandingPage = true;
  }

  nextSlide() {

  }
}
