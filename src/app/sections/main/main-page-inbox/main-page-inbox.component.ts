import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import moment from 'moment-mini';

@Component({
  selector: 'app-main-page-inbox',
  templateUrl: './main-page-inbox.component.html',
  styleUrls: ['./main-page-inbox.component.scss']
})
export class MainPageInboxComponent implements OnInit {

  constructor(public translate: TranslateService, private sportimoService: SportimoService) {

  }

  messages: any;

  ngOnInit() {
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

}