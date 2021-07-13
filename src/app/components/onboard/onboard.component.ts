import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { OnBoardService } from './onboard.service';
import { TranslateService } from '@ngx-translate/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { ConfigService } from 'src/app/services/config.service';
// import { GsapService } from "src/app/services/gsap.service";
import { User } from 'src/app/models/user';
import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PrizeViewOverlayService } from 'src/app/sections/main/prize-view-overlay/prize-view-overlay.service';
import { TermsPopupComponent } from '../terms-popup/terms-popup.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import UIkit from 'uikit';
import { TpayService } from 'src/app/services/tpay.service';


declare var Pace: any;

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.scss']
})
export class OnboardComponent implements OnInit {

  closeBtns: boolean = false;
  areaCodes = [];
  nrSelect = '';
  Onboarding = false;
  LandingPage = false;
  PinVerify = false;
  Authenticated = false;
  UsernameUpdate = false;
  UniqueLink = null;
  UniqueLinkState = 1
  UniqueLinkTextKey = 'verifyingLink';
  availableCountries: any;
  filteredOperators: any[];
  msisdnError = false;
  errorMsg = "";
  slideCount: number = 0;
  onBoardOpenBtn = false;
  dailybonus: number = 0;
  loyaltyImg: any;
  loyaltyText: any;
  loaderOpened: any;
  showInputMsg: boolean = false;
  showCheckbox: any = true;
  acceptedTerms: boolean = false;
  loginExit: boolean = false;
  showTopText: any = false;
  disableLoginCarousel: any = false;
  getOpText: boolean = false;

  termsOpText: any;
  inputMsg: any;
  termsLineText: any;

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
    _("susbcription_message_INACTIVE");
    _("susbcription_message_INACTIVE_action");
    _("susbcription_message_ENTER");
    _("GR");
    _("KZ");
    _("SA");
    _("AE");
    _("KW");
    _("EG");
    _("LY");
    _("msisdnChecks.100");
    _("msisdnChecks.101");
    _("msisdnChecks.102");
    _("msisdnChecks.103");
  }

  // "msisdnChecks": {
  // 	"100": "Please remove country code!",
  // 	"101": "Please remove any letters or characters!",
  // 	"102": "The number seems to be too long!",
  // 	"103": "The number seems to be too small!"
  // },
  // You have earned {{dailybonus}} bonus coins! Keep playing daily to win more!
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
      singleSlideText: null,
      terms: "localizedText",
      slidesShow: [
        {
          header: "localizedText",
          image: "",
          prizeText: "localizedText"
        }
      ]
    }
  }

  appName: any;
  multiOperatorForm: FormGroup;
  msisdnForm: FormGroup;
  userForm: FormGroup;
  pinForm: FormGroup;
  incorrectPin: boolean;
  isSubmitting: boolean;
  isSubmitOpen: boolean;
  submitted: boolean;
  subState: any;
  firstLoad: boolean = true;
  user: User;
  ngUnsubscribe = new Subject();
  blacklisted = 0;
  slideshow;
  appCountries = [];
  appOperators = [];

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private onBoardService: OnBoardService,
    public translate: TranslateService,
    private sportimoService: SportimoService,
    public config: ConfigService,
    private route: ActivatedRoute,
    private router: Router,
    private ViewModalOverlay: PrizeViewOverlayService,
    private gtmService: GoogleTagManagerService,
    private tpayService:TpayService,
    // private _gsapService: GsapService
  ) {

  }


  ngOnInit() {

    // Get Value From local
    // let parsedFirst = parseInt(localStorage.getItem("isFirstGame"));
    // if (parsedFirst != null){
    // console.log(document.referrer);
    // console.log(window.location);
    // console.log(window.location.origin);
    // this.slideshow = UIkit.getComponent(document.querySelector('[uk-slideshow]'));

    var slideshow = UIkit.slideshow(".uk-slideshow");
    // console.log(slideshow);

    UIkit.util.on(slideshow, 'show', function () {
      // console.log("fired!!!");
    });



    //   if(parsedFirst == 1){
    this.isSubmitOpen = false;
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

        // Handle operators and countries
        this.appOperators = this.sportimoService.getConfigurationFor("operators") || [];
        this.availableCountries = [...Array.from(new Set(this.appOperators.map(item => item.countryCodes)))].map(a => {
          let b = a.split(":");
          return { code: b[0], area: b[1], key: a };
        });


        // console.log(this.availableCountries);
        this.filteredOperators = [];

        if (this.availableCountries.length == 1) {
          console.log("Only one country available. Proceed to operators");
          // this.multiOperatorForm.controls.country = this.availableCountries[0];
          this.multiOperatorForm.controls["country"].setValue(this.availableCountries[0]);
          this.selectedCountry(this.multiOperatorForm.controls.country.value);
        }

        this.sportimoService.onboardingMetricsStart(this.defaults.name).subscribe(x => {
          // console.log(x);
        })

        let paramsSubscription = this.route.queryParamMap.pipe(first()).subscribe(queryParams => {
          this.UniqueLink = queryParams.get("uniqueLink");

          // if(paramsSubscription)
          // paramsSubscription.unsubscribe();
          // Handle Unique Link process
          if (this.UniqueLink) {
            console.log("[FLOW: Unique Link / Operator Redirection]");
            this.UniqueLinkState = 1;

            // Check to see if we are redirected from subscription landing page
            // if (this.UniqueLink == 'redirect')
            //  { 
            //    this.UniqueLinkState = 5;
            //   }

            this.Authenticated = false;
            this.Onboarding = false;
            this.LandingPage = false;

            // Check to see if we are redirected from subscription landing page
            if (this.UniqueLink == 'redirect') {

              let CGMSISDN = queryParams.get("CGMSISDN");
              let CGStatus = queryParams.get("CGStatus");
              // console.log(CGMSISDN, CGStatus);

              if (CGStatus == "0" || CGStatus == "5") {
                this.UniqueLinkState = 5;
                this.authenticationService.redirectSignin(CGMSISDN, "en").subscribe(response => {


                  if (response && response.success) {

                    this.UniqueLinkState = 0;
                    this.Authenticated = true;

                    this.subState = response.state;
                    if (this.subState == "UNSUB" && response.user.wallet > 0)
                      this.subState = "UNSUBWITHCOINS";
                    if (this.subState == "ACTIVE" && response.user.inFreePeriod) {
                      this.subState = "ACTIVEFREEPERIOD";
                      this.PinVerify = false;
                    }
                    if (this.subState == "FREE") {
                      this.subState = "ACTIVEFREEPERIOD";
                      this.PinVerify = false;
                    }
                    if (this.subState == "INACTIVE")
                      this.subState = "UNKNOWN";
                    if (this.subState == "BLACKLISTED") {
                      this.subState = "UNKNOWN";
                      this.blacklisted = 1;
                    }

                    this.UniqueLink = null;

                    if (this.sportimoService.UTMParams)
                      this.sportimoService.sendUTMParams(CGMSISDN).subscribe();


                    if (!response.user.firstLoginCompleted) {
                      this.sendThankYouPageEvent();
                    }
                  }
                });
              } else {
                this.UniqueLinkState = 6;
              }

              //  this.authenticationService.
            } else {
              this.UniqueLinkState = 2;

              // this.authenticationService.logout();

              this.authenticationService.ulinkVerify(this.UniqueLink, "en").subscribe(response => {

                if (response && response.success) {
                  console.log("Ulink");

                  this.UniqueLinkState = 0;
                  this.Authenticated = true;

                  this.subState = response.state;
                  if (this.subState == "UNSUB" && response.user.wallet > 0)
                    this.subState = "UNSUBWITHCOINS";
                  if (this.subState == "ACTIVE" && response.user.inFreePeriod) {
                    this.subState = "ACTIVEFREEPERIOD";
                    this.PinVerify = false;
                  }
                  if (this.subState == "FREE") {
                    this.subState = "ACTIVEFREEPERIOD";
                    this.PinVerify = false;
                  }
                  if (this.subState == "INACTIVE")
                    this.subState = "UNKNOWN";
                  if (this.subState == "BLACKLISTED") {
                    this.subState = "UNKNOWN";
                    this.blacklisted = 1;
                  }

                  this.UniqueLink = null;


                  if (!response.user.firstLoginCompleted) {
                    this.sendThankYouPageEvent();
                  }

                  // this.closeLandingPage();

                  // this.isSubmitting = false;


                }
              });
            }


          }
          // Else handle regular process
          else {
            console.log("[FLOW: Reqular]");

            this.Authenticated = false;
            this.Onboarding = true;
            this.LandingPage = true;

            var this_m = this;

            let returnedAreaCodes = this.sportimoService.getConfigurationFor("availableCountryCodes") || [];
            this.areaCodes = returnedAreaCodes.map(a => {
              let b = a.split(":");
              return { code: b[0], area: b[1] };
            })


            // this.areaCodes = this.sportimoService.getConfigurationFor("availableCountryCodes") || [];        
            this.nrSelect = this.areaCodes.length > 0 ? this.areaCodes[0].area : '';
            // if (this.defaults.sequence[0] == "S")       

            this_m.Onboarding = this_m.defaults.sequence[0] == "S";
            this_m.LandingPage = this_m.defaults.sequence[0] != "S";

            let bgElement = $('.landing-background');
            bgElement.css("background-image", `url(${this.defaults.landingPage.background})`);
            bgElement.css("background-size", `cover`)
          }
        });




        // Remove the loading screen
        // $('.loader-wrapper').fadeOut('slow');
        // $('.loader-wrapper').remove('slow');
        var releaseTimout;
        Pace.on('done', function () {
          // console.log("done");
          clearTimeout(releaseTimout);
          releaseTimout = setTimeout(function () {
            $('.loader-wrapper').fadeOut('slow');
            $('.loader-wrapper').remove('slow');

            // Close Texts
            var myobj = document.getElementById("LoaderTexts");
            if (myobj)
              myobj.remove();
          }, 500);
        });

        // Limit to 6 secs
        setTimeout(function () {
          $('.loader-wrapper').fadeOut('slow');
          $('.loader-wrapper').remove('slow');
          // Close Texts          
          var myobj = document.getElementById("LoaderTexts");
          if (myobj)
            myobj.remove();
        }, 1000);

      } else {
        this.Authenticated = true;
      }

    });

    this.multiOperatorForm = this.formBuilder.group({
      country: ['', Validators.required],
      operator: ['', Validators.required],
      msisdn: ['', Validators.required],
      area: ['']

    });

    this.msisdnForm = this.formBuilder.group({
      msisdn: ['', Validators.required],
      area: [this.areaCodes[0] ? this.areaCodes[0].area : '']
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

  hideBtn() {
    var nextBtn = document.getElementById("nextBtn");
    // console.log(nextBtn);
    var endBtn = document.getElementById("nextBtn");
    // console.log("endBtn");
    this.closeBtns = true;

    var slideshow = UIkit.slideshow(".uk-slideshow");
    slideshow.draggable = false;

    setTimeout(() => {
      slideshow.draggable = true;
      this.closeBtns = false;
    }, 1000);
  }

  getSlideIndex() {
    this.slideCount = UIkit.getComponent(document.querySelector('[uk-slideshow]'), 'slideshow').index;
    // console.log(this.slideCount);
    if (this.slideCount == 1)
      this.onBoardOpenBtn = true
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



  multiOperatorBack() {
    this.currentOperator = null;
    this.multiOperatorForm.reset();
    this.filteredOperators = [];
    // $('#countrySelect #default').set
    // $('#countrySelect option:nth-child(1)').val();

    $('#countrySelect option').first().attr("selected", "selected");

    if (this.availableCountries.length == 1) {
      console.log("Only one country available. Proceed to operators");
      // this.multiOperatorForm.controls.country = this.availableCountries[0];
      this.multiOperatorForm.controls["country"].setValue(this.availableCountries[0]);
      this.selectedCountry(this.multiOperatorForm.controls.country.value);
    }

    // if(this.multiOperatorForm.controls.operator)
    // this.multiOperatorForm.controls.operator = null;
    // else if(this.multiOperatorForm.controls.country)
    // this.multiOperatorForm.controls.country = null;

    // RESET VALUES
    this.disableLoginCarousel = false;
    this.showInputMsg = false;
    this.loginExit = false;
    this.showTopText = false;
    this.showCheckbox = false;
    this.PinVerify = false;
    this.LandingPage = true;
    this.getOpText = false;
  }

  selectedCountry(data) {
    // console.log(this.multiOperatorForm.controls.country.value);
    this.filteredOperators = this.appOperators.filter((operator) => {
      return operator.countryCodes == this.multiOperatorForm.controls.country.value.key;
    })


    if (this.filteredOperators.length == 1) {
      this.multiOperatorForm.controls["operator"].setValue(this.filteredOperators[0]);
      this.selectedOperator(this.filteredOperators[0]);
    }
    // console.log(this.filteredOperators);
  };

  currentOperator: any;

  selectedOperator(data) {
    this.currentOperator = this.multiOperatorForm.controls.operator.value;
    // console.log(this.currentOperator);
    if (this.currentOperator.consentTermsConditions != null)
      this.showCheckbox = this.currentOperator.consentTermsConditions;
    else
      this.showCheckbox = false;

    // Input Message
    if (this.currentOperator.enableLoginText != null) {
      this.inputMsg = this.currentOperator.loginText;
      // console.log(this.currentOperator.enableLoginText);
      this.showInputMsg = this.currentOperator.enableLoginText;
    }
    else {
      this.showInputMsg = false;
    }

    // Exit Button
    if (this.currentOperator.loginExit != null) {
      this.loginExit = this.currentOperator.loginExit;
    }
    else {
      this.loginExit = false;
    }
    //Bottom text
    if (this.currentOperator.termsText != null) {
      this.termsOpText = this.currentOperator.termsText;
      this.getOpText = true;
    }
    else {
      this.getOpText = false;
    }

    // Top Text
    if (this.currentOperator.enableTermsLineText) {
      this.showTopText = true;
      this.termsLineText = this.currentOperator.termsLineText;
    }
    else {
      this.showTopText = false;
    }


    //Carousel
    if (this.currentOperator.disableLoginCarousel != null) {
      this.disableLoginCarousel = this.currentOperator.disableLoginCarousel;
    }
    else {
      this.disableLoginCarousel = false;
    }
    // this.disableLoginCarousel = true;
  }


  onMultiOperatorSelect() {
    this.isSubmitting = true;
    if (this.multiOperatorForm.controls.operator.value.redirectUrl) {

      // redirect param is important. It is used in order to handle redirection from operator
      // let uriString = window.location.origin + this.router.url + "?uniqueLink=redirect";
      // Fix for iframed apps
      let uriString = (window.location != window.parent.location)
        ? document.referrer
        : window.location.origin + this.router.url;

      //   console.log(document.referrer);
      //  console.log(window.location.origin);
      //  console.log(this.router.url);

      //  console.log(uriString);
      //  console.log(uriString.length);
      //  console.log(uriString.indexOf('?'));
      // Clear url parameters present
      uriString = uriString.substring(0, uriString.indexOf('?') === -1 ? uriString.length : uriString.indexOf('?'));
      // Add redirection flag
      uriString += "?uniqueLink=redirect";

      // console.log(uriString);

      if (this.sportimoService.UTMParams)
        uriString += "&utm_campaign=" + this.sportimoService.UTMParams.utm_campaign +
          "&utm_source=" + this.sportimoService.UTMParams.utm_source +
          "&utm_medium=" + this.sportimoService.UTMParams.utm_medium +
          "&utm_term=" + this.sportimoService.UTMParams.utm_term +
          "&utm_content=" + this.sportimoService.UTMParams.utm_content +
          "&utm_id=" + this.sportimoService.UTMParams.utm_id;

      let URI = encodeURIComponent(uriString);
      // console.log(URI);
      let formatedRedirectURL: string = this.multiOperatorForm.controls.operator.value.redirectUrl.toString().replace("[url]", URI);
      // console.log(formatedRedirectURL);

      // Format pages redirection based on selected language
      let indexStart = formatedRedirectURL.indexOf("pages") - 1;
      let indexEnd = formatedRedirectURL.indexOf("}") + 1;
      let pages = formatedRedirectURL.substring(indexStart, indexEnd);
      // console.log(pages);

      if (pages.length > 0) {
        let pagesObject = JSON.parse("{" + pages + "}");
        let selectedPage = pagesObject.pages[this.translate.currentLang];

        if (selectedPage)
          formatedRedirectURL = formatedRedirectURL.replace(pages, selectedPage);
        else
          formatedRedirectURL = formatedRedirectURL.replace(pages, pagesObject.pages["default"]);
        // console.log(formatedRedirectURL);              
      }
      // console.log(formatedRedirectURL);
      window.top.location.href = formatedRedirectURL
    }
    else {
      console.log('[FLOW: Blaise]');
      // console.log(this.multiOperatorForm.controls.country.value.area);

      let areaCode = this.multiOperatorForm.controls.country.value.area;
      let msisdnValue = this.multiOperatorForm.controls.msisdn.value;
      // console.log(msisdnValue);
      msisdnValue = this.RemoveSpaces(msisdnValue);
      // msisdnValue = this.KeppNumbers(msisdnValue);
      // console.log(msisdnValue);

      // (this.multiOperatorForm.controls.msisdn.value != '03' ? areaCode : '') +
      let path = window.location.origin + this.router.url.substr(0, this.router.url.indexOf("main"));      
      if (this.currentOperator.sessionTPayEnabled  ) {
        this.tpayService.sessionToken.subscribe((tpaySessionToken)=>{
          this.authenticationService.blaiseSignin(areaCode + msisdnValue, this.currentOperator ? this.currentOperator.operatorCode : null, this.translate.currentLang, path, tpaySessionToken)
          .subscribe(response => {
            if (response && response.success) {
  
              this.subState = response.state;
              if (this.subState == "UNSUB" && response.user.wallet > 0)
                this.subState = "UNSUBWITHCOINS";
              // if (this.subState == "ACTIVE" && response.user.inFreePeriod)
              //   this.subState = "ACTIVEFREEPERIOD";
              if (this.subState == "FREE")
                this.subState = "ACTIVEFREEPERIOD";
              // if (this.subState == "INACTIVE")
              //   this.subState = "UNKNOWN";
              if (this.subState == "BLACKLISTED") {
                this.subState = "UNKNOWN";
                this.blacklisted = 1;
              }
  
              this.closeLandingPage();
            }
            this.isSubmitting = false;
          });
        })

        this.tpayService.getSessionToken();
       
      }else{
        this.authenticationService.blaiseSignin(areaCode + msisdnValue, this.currentOperator ? this.currentOperator.operatorCode : null, this.translate.currentLang, path)
        .subscribe(response => {
          if (response && response.success) {

            this.subState = response.state;
            if (this.subState == "UNSUB" && response.user.wallet > 0)
              this.subState = "UNSUBWITHCOINS";
            // if (this.subState == "ACTIVE" && response.user.inFreePeriod)
            //   this.subState = "ACTIVEFREEPERIOD";
            if (this.subState == "FREE")
              this.subState = "ACTIVEFREEPERIOD";
            // if (this.subState == "INACTIVE")
            //   this.subState = "UNKNOWN";
            if (this.subState == "BLACKLISTED") {
              this.subState = "UNKNOWN";
              this.blacklisted = 1;
            }

            this.closeLandingPage();
          }
          this.isSubmitting = false;
        });
      }

    }

  }



  multiOnChange() {
    if (!this.multiOperatorForm.controls.country.value)
      return;

    let areaCode = this.multiOperatorForm.controls.country.value.area;
    let msisdnValue = this.multiOperatorForm.controls.msisdn.value;

    // Remove all spaces str.replace(/\s/g, '');
    msisdnValue = msisdnValue.replace(/\s/g, '');
    var res = msisdnValue.substring(0, areaCode.length);
    // console.log("msisdn Length:" +msisdnValue.length);
    // (this.multiOperatorForm.controls.msisdn.value != '03' ? areaCode : '') +
    // CHECK IF COUNTRY CODE IS INSERTED
    if (areaCode == res) {
      this.msisdnError = true;

      // this.errorMsg = "Please remove country code!";
      this.errorMsg = "msisdnChecks.100";
      // this.isSubmitOpen = false;
      return;
    }
    if (msisdnValue.length == 0) {
      this.msisdnError = false;
      this.isSubmitOpen = false;
      return;
    }
    // CHECK IF ALL NUMBERS
    var numbers = /^[0-9]+$/;
    if (msisdnValue.match(numbers)) {
      // console.log("All Numbers!")
    } else {
      // console.log("Not all numbers!")
      this.msisdnError = true;
      // this.errorMsg = "Please remove any letters or characters!";
      this.errorMsg = "msisdnChecks.101";
      this.isSubmitOpen = false;
      return;
    }
    // Check length
    // if(msisdnValue.length >10){
    //   this.msisdnError = true;
    //   // this.errorMsg = "The number seems to be too long!";
    //   this.errorMsg = "msisdnChecks.102";
    //   this.isSubmitOpen = false;
    //   return;
    // }
    // if(msisdnValue.length < 10 && msisdnValue.length != 3 && msisdnValue != "01" && msisdnValue != "02" && msisdnValue != "03" && msisdnValue != "04" && msisdnValue != "05"){
    //   this.msisdnError = true;
    //   // this.errorMsg = "The number seems to be too small!";
    //   this.errorMsg = "msisdnChecks.103";
    //   this.isSubmitOpen = false;
    //   return;
    // }
    this.msisdnError = false;
    this.isSubmitOpen = true;
  }

  onMSISDNSubmit() {
    this.isSubmitting = true;

    let areaCode = this.areaCodes.length > 0 ? (this.areaCodes.length > 1 ? this.msisdnForm.controls.area.value : this.areaCodes[0].area) : "";
    console.log("area code: " + areaCode);
    let msisdnValue = (this.msisdnForm.controls.msisdn.value != '03' ? areaCode : '') + this.msisdnForm.controls.msisdn.value;
    console.log("msisdn Value: " + msisdnValue);
    let path = window.location.origin + this.router.url.substr(0, this.router.url.indexOf("main"));
    console.log(path);

    this.authenticationService.blaiseSignin(msisdnValue, this.currentOperator ? this.currentOperator.operatorCode : null, this.translate.currentLang, path)
      .subscribe(response => {
        // console.log("Authenticate");
        // console.log(response);
        if (response && response.success) {
          this.subState = response.state;
          if (this.subState == "UNSUB" && response.user.wallet > 0)
            this.subState = "UNSUBWITHCOINS";
          // if (this.subState == "ACTIVE" && response.user.inFreePeriod)
          // if (this.subState == "ACTIVE" && response.user.inFreePeriod)
          //   this.subState = "ACTIVEFREEPERIOD";
          if (this.subState == "FREE")
            this.subState = "ACTIVEFREEPERIOD";
          // if (this.subState == "INACTIVE")
          //   this.subState = "UNKNOWN";
          if (this.subState == "BLACKLISTED") {
            this.subState = "UNKNOWN";
            this.blacklisted = 1;
          }

          this.closeLandingPage();
          // Do Daily bonus check
          // this.showDailyBonusModal();
        }
        this.isSubmitting = false;
      });

  }

  getCountryCode(value) {
    let ret = this.areaCodes.find(codes => {
      return codes.area == value;
    });
    if (ret)
      return ret.code.toLowerCase();

    return '';
  }

  onPinSubmit(noSubscription: boolean) {

    if (this.pinForm.controls.pin.errors) {
      return;
    }

    this.isSubmitting = true;

    if (this.blacklisted > 0) {
      this.blacklisted = 2;
      this.isSubmitting = false;
      return;
    }
    // console.log(this.pinForm.controls.pin.value);


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
            else {
              // Do The Daily Bonus Check
              // console.log("Show Daily Bonus!");
              // this.showDailyBonusModal();
            }

            if (this.subState == "UNKNOWN") {
              // console.log(this.subState);
              this.UsernameUpdate = true;
              this.Authenticated = false;
            }

            // User Registered - We can stop the metrics
            this.sportimoService.onboardingMetricsStop(response.user.msisdn).subscribe(x => {
              // console.log(x);
            });

            // If we have UTM Params forward them to Blaise
            if (this.sportimoService.UTMParams) {
              this.sportimoService.sendUTMParams(response.user.msisdn).subscribe();
            }

            if (!response.user.firstLoginCompleted) {
              this.sendThankYouPageEvent();
            }

          } else {
            this.incorrectPin = true;
            this.isSubmitting = false;
          }
        },
        error => {
          this.incorrectPin = true;
          this.isSubmitting = false;
        });
  }

  sendThankYouPageEvent() {
    const client = this.config.getClient();
    const appName = this.sportimoService.getConfigurationFor('appName').en;
    const gtmTag = {
      event: 'page',
      appName: appName,
      clientId: client,
      pageRoute: "main/thankyou",
      page: "main/thankyou"
    };
    this.gtmService.pushTag(gtmTag);
  }

  showDailyBonusModal() {
    // console.log("Loyalty Bonus: " + this.dailybonus);
    this.loyaltyImg = this.sportimoService.getConfigurationFor('userLoyaltySponsorImageUrl');
    this.loyaltyText = this.sportimoService.getConfigurationFor('userLoyaltySponsorText');
    // console.log(this.loyaltyImg);
    // console.log(this.loyaltyText);
    this.dailybonus = this.user.loyaltyCoins;

    // Testing
    // this.dailybonus = 1;
    if (this.dailybonus > 0) {
      var dailymodal = UIkit.modal("#dailyModal", { escClose: false, bgClose: false });
      dailymodal.show();

    }
  }

  collectCoin() {
    // Collect Loyalty
    this.authenticationService.collectLoyalty().subscribe(user => {
      this.user = user;
    });
    //Close Modal
    let modal = UIkit.modal("#dailyModal", { escClose: false, bgClose: false });
    modal.hide();
  }

  openTerms() {
    // window.open("http://sportimo.com/en/terms-conditionsru/","_blank"); 
    this.ViewModalOverlay.open<TermsPopupComponent>(TermsPopupComponent, {});
    // console.log("Openning terms!");
    // this.ViewModalOverlay.open<DailyBonusComponent>(DailyBonusComponent, {});
  }

  openTermsLink(termsLink: string) {
    // window.open(termsLink,"_blank"); 
    this.ViewModalOverlay.open<TermsPopupComponent>(TermsPopupComponent, {});
  }

  onUsernameUpdate() {
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
          if (response && response.success) {
            this.pinSent = true;
            let that = this;
            setTimeout(() => {
              that.pinSent = false;
            }, 7000);
          }

          this.isSubmitting = false;
        });
  }

  onCheckboxChange(e) {

    if (e.target.checked) {
      this.acceptedTerms = e.target.checked
      // console.log(this.acceptedTerms);
      // console.log(this.showCheckbox);
    } else {
      this.acceptedTerms = e.target.checked
      // console.log(this.acceptedTerms);
      // console.log(this.showCheckbox);
    }

    // console.log("Enable button: " + (this.showCheckbox && this.acceptedTerms));

  }

  RemoveSpaces(string) {
    return string.split(' ').join('');
  }

  KeppNumbers(string) {
    return string.replaceAll("[^0-9.]", "");
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}

