import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from './services/config.service';
import { CardToastService } from './components/card-toast/card-toast.service';
import { SportimoService } from './services/sportimo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  public appTheme = "";

  constructor(
    translate: TranslateService,
    private configService: ConfigService,
    private sportimoService: SportimoService
  ) {
    console.log("Subscribing to configuration");
    
    this.sportimoService.getClientConfiguration().subscribe(data=>{
      let selected_language = localStorage.getItem('language');
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');
      // translate.getTranslation('en').subscribe(() => {});
      // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use(selected_language || this.sportimoService.getConfigurationFor("defaultLanguage"));

      this.appTheme = this.sportimoService.getConfigurationFor("theme") || "default";

       // Change the app background
      if(this.sportimoService.getConfigurationFor("appBackgroundUrl"))
        $('Body').css("background-image",  `url(${this.sportimoService.getConfigurationFor("appBackgroundUrl")})`); 
    });

   
  }

  ngOnInit() {
    // this.cardToastService.Show({
    //   time: "14'",
    //   event: "offside",
    //   teamKit: "https://s3-eu-west-1.amazonaws.com/sportimo-media/teams/Asset129.png"
    // });

    // this.cardToastService.Show({
    //   time: "14'",
    //   event: "offside",
    //   teamKit: "nothing"
    // });

    // this.cardToastService.Show({
    //   time: "14'",
    //   event: "offside",
    //   teamKit: "nothing"
    // });
  }
}
