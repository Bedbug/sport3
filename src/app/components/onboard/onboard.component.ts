import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OnBoardService } from './onboard.service';
import { TranslateService } from '@ngx-translate/core';
import { debug } from 'util';
import { SportimoService } from 'src/app/services/sportimo.service';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.scss']
})
export class OnboardComponent implements OnInit {

  Onboarding = false;
  LandingPage = false;
  Authenticated = false;

  public defaults = {
    name:"",
    sequence: ["S", "L"],
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
    landingPage: {
      background: "",
      terms: "localizedText",
      slidesShow: [
        {
          header: "localizedText",
          image: "imageUrl",
          prizeText: "localizedText"
        }
      ]
    }
  }

  isSubmitting: boolean;

  constructor(private onBoardService: OnBoardService, public translate: TranslateService, private sportimoService:SportimoService) { }


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
      if (x) {
        this.defaults = this.onBoardService.defaults;
        
        this.sportimoService.onboardingMetricsStart(this.defaults.name).subscribe(x=>{
          console.log(x);          
        })

        this.Authenticated = false;
                     
        if (this.defaults.sequence[0] == "S")
          this.Onboarding = x;
          else
          this.LandingPage = true;
        
          let bgElement =  $('.landing-background');
          bgElement.css("background-image", `url(${this.defaults.landingPage.background})`);
          bgElement.css("background-size", `cover`)
      }

    });

    // this.isFirstGame = true;
    // localStorage.setItem(key, 'New Value');
  }


  closeOnBoarding() {
    localStorage.setItem("isFirstGame", "1");
    this.Onboarding = false;
    if (this.defaults.sequence[0] == "S")
      this.LandingPage = true;
      else
      this.sportimoService.onboardingMetricsStop("").subscribe(x=>{
        console.log(x);          
      })
  }

  closeLandingPage(){
    this.LandingPage = false;
    this.isSubmitting = true;
    if (this.defaults.sequence[0] == "L")
      this.Onboarding = true;
      else
      this.sportimoService.onboardingMetricsStop("").subscribe(x=>{
        console.log(x);          
      })

  }

  nextSlide() {

  }
}
