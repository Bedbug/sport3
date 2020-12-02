import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from './services/config.service';
import { CardToastService } from './components/card-toast/card-toast.service';
import { SportimoService } from './services/sportimo.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from './services/authentication.service';

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
    private sportimoService: SportimoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gtmService: GoogleTagManagerService,
    private cookieservice: CookieService,
    private authenticationService: AuthenticationService
  ) {

    this.router.events.forEach(item => {
      // console.log(item);

      if (item instanceof NavigationEnd) {
        const client = this.configService.getClient();
        const appName = this.sportimoService.getConfigurationFor('appName').en;
        let page = "";

        if (item.url.indexOf(client) !== -1) {
          // console.log(item.url.indexOf('?'));
          page = item.url.substring(item.url.indexOf(client) + client.length);
          if (page.indexOf('?') !== -1)
            page = page.substring(0, page.indexOf('?'));
        }
        else
          page = item.url.substring(item.url.indexOf('/0/') + 2);

        const gtmTag = {
          event: 'page',
          appName: appName,
          clientId: client,
          pageRoute: item.url,
          page: page
        };

        var d = new Date();
        d.setTime(d.getTime() + (30 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();

        // console.log(page);
        this.cookieservice.set('session', page, d, "/");        
        
        if(this.authenticationService.currentUserValue)
         { parent.postMessage(page, "*");}

        this.gtmService.pushTag(gtmTag);
      }

    });
    // this.sportimoService.getClientConfiguration().subscribe(data=>{
    //   let selected_language = localStorage.getItem('language');
    //   // this language will be used as a fallback when a translation isn't found in the current language
    //   translate.setDefaultLang('en');
    //   // translate.getTranslation('en').subscribe(() => {});
    //   // the lang to use, if the lang isn't available, it will use the current loader to get them
    //   translate.use(selected_language || this.sportimoService.getConfigurationFor("defaultLanguage"));

    //   this.appTheme = this.sportimoService.getConfigurationFor("theme") || "default";

    //    // Change the app background
    //   if(this.sportimoService.getConfigurationFor("appBackgroundUrl"))
    //     $('Body').css("background-image",  `url(${this.sportimoService.getConfigurationFor("appBackgroundUrl")})`); 

    //   if(this.sportimoService.getConfigurationFor("appLogo"))
    //     $('.app-logo').css("background-image",`url(${this.sportimoService.getConfigurationFor("appLogo")})`)

    // });

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
