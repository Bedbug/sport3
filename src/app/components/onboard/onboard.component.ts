import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { OnBoardService } from './onboard.service';
import { TranslateService } from '@ngx-translate/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { ConfigService } from 'src/app/services/config.service';
import { User } from 'src/app/models/user';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PrizeViewOverlayService } from 'src/app/sections/main/prize-view-overlay/prize-view-overlay.service';
import { TermsPopupComponent } from '../terms-popup/terms-popup.component';

declare var Pace: any;

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
  UsernameUpdate = false;

  translateMappings() {
    _("susbcription_message_UNKNOWN");
    _("susbcription_message_UNKNOWN_action");
    _("susbcription_message_UNSUB");
    _("susbcription_message_UNSUB_action");
    _("susbcription_message_UNSUBWITHCOINS");
    _("susbcription_message_UNSUBWITHCOINS_action");
    _("susbcription_message_ACTIVEFREEPERIOD");
    _("susbcription_message_ACTIVEFREEPERIOD_action");
    _("susbcription_message_ACTIVE");
    _("susbcription_message_ACTIVE_action");
    _("susbcription_message_ENTER");
  }

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
      singleSlideText:null,
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

  appName: any;
  msisdnForm: FormGroup;
  userForm: FormGroup;
  pinForm: FormGroup;
  incorrectPin: boolean;
  isSubmitting: boolean;
  submitted: boolean;
  subState: any;
  firstLoad: boolean = true;
  user: User;
  ngUnsubscribe = new Subject();

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private onBoardService: OnBoardService,
    public translate: TranslateService,
    private sportimoService: SportimoService,
    public config: ConfigService,
    private ViewModalOverlay: PrizeViewOverlayService
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
    this.authenticationService.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user => {
      this.user = user;           
    });

    // Get value from Service
    this.onBoardService.onboardModalIsActive.subscribe(x => {

      if (x) {
        this.defaults = this.onBoardService.defaults;
        this.appName = this.onBoardService.appName;

        this.sportimoService.onboardingMetricsStart(this.defaults.name).subscribe(x => {
          // console.log(x);
        })

        this.Authenticated = false;
        this.Onboarding = true;
        this.LandingPage = true;
        var this_m = this;
        // if (this.defaults.sequence[0] == "S")

        this_m.Onboarding = this_m.defaults.sequence[0] == "S";
        this_m.LandingPage = this_m.defaults.sequence[0] != "S";

        let bgElement = $('.landing-background');
        bgElement.css("background-image", `url(${this.defaults.landingPage.background})`);
        bgElement.css("background-size", `cover`)

        // Remove the loading screen
        // $('.loader-wrapper').fadeOut('slow');
        // $('.loader-wrapper').remove('slow');
        var releaseTimout;
        Pace.on('done', function() {
          // console.log("done");
          clearTimeout(releaseTimout);
          releaseTimout = setTimeout(function(){

              $('.loader-wrapper').fadeOut('slow');
          $('.loader-wrapper').remove('slow'); }, 500);
        });

        // Limit to 6 secs
        setTimeout(function(){
                $('.loader-wrapper').fadeOut('slow');
        $('.loader-wrapper').remove('slow'); }, 7000);
      }else{
        this.Authenticated  = true;
      }

    });

    this.msisdnForm = this.formBuilder.group({
      msisdn: ['', Validators.required]
    });

    // Pin Verification Form
    this.pinForm = this.formBuilder.group({
      pin: ['', Validators.required]
    });

    this.userForm = this.formBuilder.group({
      username: ['', Validators.required]
    });

    // this.isFirstGame = true;
    // localStorage.setItem(key, 'New Value');
  }


  closeOnBoarding() {
    localStorage.setItem("isFirstGame", "1");
    this.Onboarding = false;
    if (this.defaults.sequence[0] == "S")
      this.LandingPage = true;
  }

  closeLandingPage() {
    this.LandingPage = false;

    this.PinVerify = true;
    // console.log($('#pinInput'));
    // setTimeout(() => {
    //   $('#pinInput').focus();
    // }, 0)

  }

  nextSlide() { }

  onMSISDNSubmit() {
    this.isSubmitting = true;
    this.authenticationService.blaiseSignin(this.msisdnForm.controls.msisdn.value, this.translate.currentLang)
      .subscribe(response => {
        if (response && response.success) {
          this.subState = response.state;
          if (this.subState == "UNSUB" && response.user.wallet > 0)
            this.subState = "UNSUBWITHCOINS";
          if (this.subState == "ACTIVE" && response.user.inFreePeriod)
            this.subState = "ACTIVEFREEPERIOD";
            if (this.subState == "FREE")
            this.subState = "ACTIVEFREEPERIOD";
            if (this.subState == "INACTIVE")
            this.subState = "UNKNOWN";
          this.closeLandingPage();
        }
        this.isSubmitting = false;
      });

  }

  onPinSubmit(noSubscription: boolean) {

    if (this.pinForm.controls.pin.errors) {
      return;
    }

    this.isSubmitting = true;

    this.authenticationService.blaiseVerify(this.pinForm.controls.pin.value, noSubscription)
      .subscribe(
        response => {
          if (response && response.success) {
            // console.log(response);
            this.incorrectPin = false;
            this.isSubmitting = false;
            this.PinVerify = false;
            this.Authenticated = true;
            if (this.defaults.sequence[0] == "L")
              this.Onboarding = true;             
                           
              if(this.subState == "UNKNOWN")
             {
              // console.log(this.subState);
                this.UsernameUpdate = true;
                this.Authenticated = false;
            }

              // User Registered - We can stop the metrics
              this.sportimoService.onboardingMetricsStop("").subscribe(x => {
                console.log(x);
              })
          }else{
            this.incorrectPin = true;
            this.isSubmitting = false;
          }
        },
        error => {
          this.incorrectPin = true;
          this.isSubmitting = false;
        });
  }

  openTerms(){
    // window.open("http://sportimo.com/en/terms-conditionsru/","_blank"); 
    this.ViewModalOverlay.open<TermsPopupComponent>(TermsPopupComponent,{});
  }

  onUsernameUpdate(){
    if (this.userForm.controls.username.errors) {
      return;
    }

    this.isSubmitting = true;
    this.authenticationService.updateUsername(this.userForm.controls.username.value)
    .subscribe(
      response => {
        this.isSubmitting = false;
        this.Authenticated = true;
        if (response && response.success) {
        };
      });
      this.UsernameUpdate = false;

  }

  pinSent = false;

  ResendPin() {
    this.isSubmitting = true;
    this.authenticationService.resendPin(this.translate.currentLang)
    .subscribe(
      response => {
        if(response && response.success){
          this.pinSent = true;
          let that = this;
          setTimeout(()=>{
            that.pinSent = false;
          },7000);
        }

        this.isSubmitting = false;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}

