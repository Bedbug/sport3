import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { config } from 'rxjs';
import { OnBoardService } from 'src/app/components/onboard/onboard.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  public isRTL: boolean;

  RTL_languages = ["fa"];

  constructor
    (
      private translate: TranslateService,
      private route: ActivatedRoute,
      private sportimoService: SportimoService,
      private onBoardService: OnBoardService,
      private configService: ConfigService) {
    // Assign Client based on url
    let client = this.route.snapshot.paramMap.get("cid");
    if (client && client != "0")
      configService.setClient(client);
  }

  public appTheme = "";

  ngOnInit() {

    this.sportimoService.getClientConfiguration().subscribe(data => {

      let selected_language = localStorage.getItem('language');
      // this language will be used as a fallback when a translation isn't found in the current language
      this.translate.setDefaultLang('en');
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
      });
      this.isRTL = this.RTL_languages.find(lang => lang === this.translate.currentLang) != null;


      // Handle Unique Link
      this.route.queryParamMap.subscribe(queryParams => {
        let unique = queryParams.get("unique");
        if (unique != null) {
          localStorage.removeItem("isFirstGame");
          localStorage.removeItem("signon");
        }
      })


      let parsedFirst = parseInt(localStorage.getItem("isFirstGame"));
      let signonData = JSON.parse(localStorage.getItem('signon'));

      let onBoardingConfiguration = this.sportimoService.getConfigurationFor("onBoardingSequence");


      if ((!signonData || !signonData.pin) && onBoardingConfiguration) {
        this.onBoardService.Show(onBoardingConfiguration, this.sportimoService.getConfigurationFor("appName"));
      } else {
        this.onBoardService.Hide();
        $('.loader-wrapper').fadeOut('slow');
        $('.loader-wrapper').remove('slow');
      }


    });

  }

}
