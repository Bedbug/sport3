import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { SubscriptionService } from '../../services/subscription.service';
import $ from 'jquery';
import moment from 'moment-mini';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-subscribe-notice',
  templateUrl: './subscribe-notice.component.html',
  styleUrls: ['./subscribe-notice.component.scss']
})
export class SubscribeNoticeComponent implements OnInit {

  isLoggedIn: boolean = false;
  isSubscribed: boolean = false;

  constructor(private authenticationService: AuthenticationService, private subscriptionService: SubscriptionService) { }

  ngOnInit() {
    this.checkState();
  }


  checkState() {

    this.authenticationService.currentUser.subscribe(user => {
      this.isLoggedIn = user != null;
      if (this.isLoggedIn) {
        // this.isSubscribed = (user && user.subscriptionEnd && moment(user.subscriptionEnd).utc() > moment().utc())
        this.isSubscribed = (user != null);
      }
    })
  }

  subscribe() {
    $('#app-register-modal').removeClass('hidden');
    $('#app-register-modal #step1').addClass('modal-appear');
    $('#app-register-modal #step1').removeClass('hidden');
    $('#app-register-modal #step2').removeClass('modal-appear');
    $('#app-register-modal #step2').addClass('hidden');
    $('#app-register-modal #step3').removeClass('modal-appear');
    $('#app-register-modal #step3').addClass('hidden');
    $('#app-register-modal #step4').removeClass('modal-appear');
    $('#app-register-modal #step4').addClass('hidden');
  }

  login(){    
      $('#app-login-modal').removeClass('hidden');
      $('#app-login-modal').addClass('modal-appear');
  }


}
