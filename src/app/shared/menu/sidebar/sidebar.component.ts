import { Component, OnInit } from '@angular/core';
import { MENUITEMS, Menu } from './sidebar-items';
import { Router, ActivatedRoute } from "@angular/router";
import $ from 'jquery';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: Menu[];
  public isLoggedIn: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    public translate:TranslateService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      // this.router.navigate(['/user/contests']);
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

        // Localization Markers
        _('My Account');
        _('Profile');
        _('Balance');
        _('Messages');
        _('Achievements');
        _('My Teams');
        _('Top Picks');
        _('Contests');
        _('Winners');
        _('Standings');
        _('Settings');
        _('About Sportimo');
        _('How to Play');
        _('Support');
        _('Terms & Conditions');
        _('Privacy Policy'); 
        _('Language'); 
        _('english'); 
        _('farsi'); 
  }

  ngOnInit() {
    $.getScript('./assets/js/sidebar-menu.js');
    this.menuItems = MENUITEMS.filter(menuItem => menuItem);
    this.authenticationService.currentUser.subscribe(user=>{
      this.isLoggedIn = user!=null;
    });
  }

  toggleUserStatus(){
    if(this.isLoggedIn){
    this.logout();
    this.closeSidebar()
    }else{
      $(".page-body-wrapper").addClass("sidebar-close");
      $('.sidebar-background').addClass('hidden');
      $('#app-login-modal').removeClass('hidden');
      $('#app-login-modal').addClass('modal-appear');
    }
  }

  closeSidebar(){
    $(".page-body-wrapper").addClass("sidebar-close");
      $('.sidebar-background').addClass('hidden');
  }

  logout() {
    this.authenticationService.logout();
    this.isLoggedIn = false;
}

switchLanguage(lang:string){
  this.translate.use(lang);
}

}
