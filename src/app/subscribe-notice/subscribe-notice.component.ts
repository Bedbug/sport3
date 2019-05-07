import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { SubscriptionService } from '../services/subscription.service';
import { first } from 'rxjs/operators';

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
    console.log("Check State");
    
    this.checkState();
  }

  checkState() {
    
    this.authenticationService.currentUser.subscribe(user=>{
      this.isLoggedIn = user!=null;
    })

    if (this.isLoggedIn) {
      this.subscriptionService.getSubscriptionDataForUser(this.authenticationService.currentUserValue.id)
        .subscribe(
          data => {         
              this.isSubscribed = (data && data.status == "active");
          },
          error => {

          }
        );
    }
  }


}
