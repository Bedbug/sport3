import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { OnBoardService } from './onboard.service';
import { TranslateService } from '@ngx-translate/core';
import { debug } from 'util';
import { SportimoService } from 'src/app/services/sportimo.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.scss']
})
export class OnboardComponent implements OnInit {

  Onboarding = false;
  LandingPage = false;
  PinVerify = false;
  Authenticated = false;

  public defaults = {
    name: "",
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

  pinForm: FormGroup;
  incorrectPin: boolean;
  isSubmitting: boolean;
  submitted: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private onBoardService: OnBoardService,
    public translate: TranslateService,
    private sportimoService: SportimoService
  ) { }


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

        this.sportimoService.onboardingMetricsStart(this.defaults.name).subscribe(x => {
          console.log(x);
        })

        this.Authenticated = false;

        if (this.defaults.sequence[0] == "S")
          this.Onboarding = x;
        else
          this.LandingPage = true;

        let bgElement = $('.landing-background');
        bgElement.css("background-image", `url(${this.defaults.landingPage.background})`);
        bgElement.css("background-size", `cover`)
      }

    });

    // Pin Verification Form
    this.pinForm = this.formBuilder.group({
      pin: ['', Validators.required]
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
      this.sportimoService.onboardingMetricsStop("").subscribe(x => {
        console.log(x);
      })
  }

  closeLandingPage() {
    this.LandingPage = false;
    this.isSubmitting = true;

    // if (this.defaults.sequence[0] == "L")
    //   this.Onboarding = true;
    // else
    //   this.sportimoService.onboardingMetricsStop("").subscribe(x => {
    //     console.log(x);
    //   })
    this.PinVerify = true;

  }

  nextSlide() { }

  onPinSubmit() {
    this.isSubmitting = true;
    this.authenticationService.validatePIN(this.pinForm.controls.pin.value)
      .subscribe(
        response => {
          console.log(response);
          this.incorrectPin = false;
          this.isSubmitting = false;
          $('#app-register-modal #step3').addClass('modal-appear');
          $('#app-register-modal #step3').removeClass('hidden');
          $('#app-register-modal #step2').removeClass('modal-appear');
          $('#app-register-modal #step2').addClass('hidden');
        },
        error => {
          this.incorrectPin = true;
          this.isSubmitting = false;
        });
  }
}

