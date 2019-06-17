import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main-page-avatars',
  templateUrl: './main-page-avatars.component.html',
  styleUrls: ['./main-page-avatars.component.scss']
})
export class MainPageAvatarsComponent implements OnInit {

  user: User;
  ngUnsubscribe = new Subject();

  avatars: string[] =[
    './assets/images/sportimo/avatars/avatar1.png',
    './assets/images/sportimo/avatars/avatar2.png',
    './assets/images/sportimo/avatars/avatar3.png',
    './assets/images/sportimo/avatars/avatar4.png',
    './assets/images/sportimo/avatars/avatar5.png',
    './assets/images/sportimo/avatars/avatar6.png',
    './assets/images/sportimo/avatars/avatar7.png',
    './assets/images/sportimo/avatars/avatar8.png',
    './assets/images/sportimo/avatars/avatar9.png',
    './assets/images/sportimo/avatars/avatar10.png',
    './assets/images/sportimo/avatars/avatar11.png',
    './assets/images/sportimo/avatars/avatar12.png',
    './assets/images/sportimo/avatars/avatar13.png',
    './assets/images/sportimo/avatars/avatar14.png',
    './assets/images/sportimo/avatars/avatar15.png',
  ]
  
  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user => {
      this.user = user;
    });
  }

  selectAvatar(avatarUrl:string){
    this.authenticationService.updateAvatar(avatarUrl).subscribe();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}
