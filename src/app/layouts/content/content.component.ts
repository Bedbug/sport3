import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  
  isRTL: boolean;
  RTL_languages = ["fa"];

  constructor(private translate: TranslateService) { }



  ngOnInit() {
    
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      
      localStorage.setItem('language',this.translate.currentLang);
      
      this.isRTL = this.RTL_languages.find(lang => lang === this.translate.currentLang) != null;
    });
    this.isRTL = this.RTL_languages.find(lang => lang === this.translate.currentLang) != null;
  }

}
