import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { config } from 'rxjs';
import { OnBoardService } from 'src/app/components/onboard/onboard.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { from, fromEvent, Observable, Subscription } from 'rxjs';
import { GsapService } from "src/app/services/gsap.service";
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

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
  loaderOpened = false;

  translateMappings() {
    _("slidetextl.100");
    _("slidetextr.100");
    _("slidetextl.101");
    _("slidetextr.101");
    _("slidetextl.102");
    _("slidetextr.102");
    _("slidetextl.103");
    _("slidetextr.103");
    _("slidetextl.104");
    _("slidetextr.104");
    _("slidetextl.105");
    _("slidetextr.105");
    _("slidetextl.106");
    _("slidetextr.106");
    _("slidetextl.107");
    _("slidetextr.107");
  }


  public isRTL: boolean;
  RTL_languages = ["fa", "ar", "ku"];

  constructor
    (
      private translate: TranslateService,
      private route: ActivatedRoute,
      private sportimoService: SportimoService,
      private onBoardService: OnBoardService,
      private configService: ConfigService,
      private _gsapService: GsapService,
      private authService: AuthenticationService) {
    // Assign Client based on url
    let client = this.route.snapshot.paramMap.get("cid");
    if (client && client != "0")
      configService.setClient(client);
  }

  public appTheme = "";

  ngOnInit() {
  // play tween animations of texts
 

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
    
    let langParam = null;

    // this.translate.use(selected_language || this.sportimoService.getConfigurationFor("defaultLanguage"));
    // console.log(this.translate.currentLang);
    

    this.sportimoService.getClientConfiguration().subscribe(data => {

       // Handle URL PARAMS
       this.route.queryParamMap.subscribe(queryParams => {

        langParam = queryParams.get("lang");

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

      // this language will be used as a fallback when a translation isn't found in the current language
      // console.log(langParam);
      
      // translate.getTranslation('en').subscribe(() => {});
      // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.translate.use(langParam || selected_language || this.sportimoService.getConfigurationFor("defaultLanguage"));

      this.loaderTextAnim();
      this.appTheme = this.sportimoService.getConfigurationFor("theme") || "default";
      
      $('body').addClass(this.appTheme);
      // this.appTheme = "tribute";
      
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
        // Close Texts        
        // this.loaderOpened = false;
        // Close Texts
        var myobj = document.getElementById("LoaderTexts");
        if(myobj)
          myobj.remove();
      }
    });

  }
  textcount:any = -1;
  textleft:any = "";
  textRight:any = "";
  

  public loaderTextAnim() {
    const anim = this._gsapService;
    this.loaderOpened = true;

    var fromTime = 1;
    var alphaToTime = 2.5;
    this.textcount++;
    if( this.textcount == 8 )
      return;
      this.textleft = "slidetextl";
      this.textRight = "slidetextr"

    this.translate.get("slidetextl.10" + this.textcount).subscribe((res: string) => {
      this.textleft = res;
      //=> 'hello world'
    });
    this.translate.get("slidetextr.10" + this.textcount).subscribe((res: string) => {
      this.textRight = res;
      //=> 'hello world'
  });

      var myobj = document.getElementById("LoaderTexts");
        if(!myobj)
          return;
    // this.textleft = this.translate. "slidetextl.10"+this.textcount;
    // this.textRight = "slidetextr.10"+this.textcount;
    // Slide Orange to the left
    const text01 = ".animTextL1";
    const text02 = ".animTextR1";
    
    
    // Text 01
    anim.fFrom(text01, 1, -(window.innerWidth/3), 0, fromTime);
    anim.aTo(text01, 1, 1, fromTime);
    anim.fFrom(text02, 1, +(window.innerWidth/3), 0, fromTime);
    anim.aTo(text02, 1, 1, fromTime);
    anim.aTo(text01, 0.5, 0, alphaToTime);
    anim.aTo(text02, 0.5, 0, alphaToTime);
    
    setTimeout(() => {
      this.loaderTextAnim();
    }, 3500);
  }
  ngOnDestroy(): void {
    /**
    * Unsubscribe all subscriptions to avoid memory leak
    */
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
