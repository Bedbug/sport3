import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { config } from 'rxjs';
import { OnBoardService } from 'src/app/components/onboard/onboard.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { from, fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  connectionStatus: boolean = true;
  connectionRestored: boolean = false;
  subscriptions: Subscription[] = [];

  public isRTL: boolean;
  RTL_languages = ["fa", "ar"];

  constructor
    (
      private translate: TranslateService,
      private route: ActivatedRoute,
      private sportimoService: SportimoService,
      private onBoardService: OnBoardService,
      private configService: ConfigService,
      private authService: AuthenticationService) {
    // Assign Client based on url
    let client = this.route.snapshot.paramMap.get("cid");
    if (client && client != "0")
      configService.setClient(client);
  }

  public appTheme = "";

  ngOnInit() {

    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatus = true;      
      this.connectionRestored = true;
      setTimeout(()=>{
        this.connectionRestored = false;
      },3000);
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatus = false;      
    }));


    this.translate.setDefaultLang('en');
    let selected_language = localStorage.getItem('language');
    this.translate.use(selected_language || this.sportimoService.getConfigurationFor("defaultLanguage"));
    console.log("Setting language");
    
    this.sportimoService.getClientConfiguration().subscribe(data => {

      
      // this language will be used as a fallback when a translation isn't found in the current language
     
      // translate.getTranslation('en').subscribe(() => {});
      // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.translate.use(selected_language || this.sportimoService.getConfigurationFor("defaultLanguage"));

      this.appTheme = this.sportimoService.getConfigurationFor("theme") || "default";

      // Change the app background
      if (this.sportimoService.getConfigurationFor("appBackgroundUrl"))
        $('Body').css("background-image", `url(${this.sportimoService.getConfigurationFor("appBackgroundUrl")})`);

      if (this.sportimoService.getConfigurationFor("appLogo"))
        $('.app-logo').css("background-image", `url(${this.sportimoService.getConfigurationFor("appLogo")})`)


      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {

        localStorage.setItem('language', this.translate.currentLang);
        this.isRTL = this.RTL_languages.find(lang => lang === this.translate.currentLang) != null;
        // console.log(this.translate.currentLang);
        if (this.isRTL)
          $('body').addClass('rtl');
        else
          $('body').removeClass('rtl');
      });
      this.isRTL = this.RTL_languages.find(lang => lang === this.translate.currentLang) != null;
      if (this.isRTL)
        $('body').addClass('rtl');
      else
        $('body').removeClass('rtl');


      // Handle URL PARAMS
      this.route.queryParamMap.subscribe(queryParams => {
        // Unique Link Reset
        let unique = queryParams.get("uniqueLink");

        if (unique)
          localStorage.removeItem("signon");


        // UTM Params
        if (queryParams.get("utm_source")) {
          this.sportimoService.setUTMParams(
            queryParams.get("utm_campaign"),
            queryParams.get("utm_source"),
            queryParams.get("utm_medium"),
            queryParams.get("utm_term"),
            queryParams.get("utm_content"),
            queryParams.get("utm_id")
          );

          console.log(this.sportimoService.UTMParams)
        }


      })


      // let parsedFirst = parseInt(localStorage.getItem("isFirstGame"));
      // let signonData = JSON.parse(localStorage.getItem('signon'));

      let onBoardingConfiguration = this.sportimoService.getConfigurationFor("onBoardingSequence");


      // if ((!signonData || !signonData.pin) &&
      if (onBoardingConfiguration && !this.authService.currentUserValue) {
        this.onBoardService.Show(onBoardingConfiguration, this.sportimoService.getConfigurationFor("appName"));
      } else {
        this.onBoardService.Hide();
        $('.loader-wrapper').fadeOut('slow');
        $('.loader-wrapper').remove('slow');
      }
    });

  }

  ngOnDestroy(): void {
    /**
    * Unsubscribe all subscriptions to avoid memory leak
    */
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
