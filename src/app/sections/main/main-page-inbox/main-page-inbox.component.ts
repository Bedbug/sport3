import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import moment from 'moment-mini';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';

@Component({
  selector: 'app-main-page-inbox',
  templateUrl: './main-page-inbox.component.html',
  styleUrls: ['./main-page-inbox.component.scss']
})
export class MainPageInboxComponent implements OnInit {

  constructor(
    public translate: TranslateService, 
    private sportimoService: SportimoService,
    private authenticationService:AuthenticationService
    ) {

  }

  messages: any;
  Utils: SportimoUtils = new SportimoUtils();
  
  ngOnInit() {
    this.authenticationService.markInboxRead();
    this.sportimoService.getMessages().subscribe(x => {
      let last_check = localStorage.getItem('last_inbox_check');
      if (x != null)
        x.forEach(message => {
          message.read = (last_check && moment(message.created).utc() < moment(last_check).utc());
        });
      this.messages = x;
    })
  }

  ngOnDestroy() {
    localStorage.setItem('last_inbox_check', moment().utc().format());
  }

  parseDate(date:string){    
    return this.Utils.parseDate(date,this.translate.currentLang=='fa', 'D/MM/YY HH:mm', 'jD/jMM/jYY hh:mm');
}

}
