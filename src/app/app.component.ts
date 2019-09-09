import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(translate:TranslateService, private configService:ConfigService){    
    let selected_language = localStorage.getItem('language');
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // translate.getTranslation('en').subscribe(() => {});
    // the lang to use, if the lang isn't available, it will use the current loader to get them
   translate.use(selected_language || this.configService.get('language'));
  }
}
