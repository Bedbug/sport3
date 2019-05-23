import { Component, OnInit } from '@angular/core';
import { MENUITEMS, Menu } from './sidebar-items';
import { Router, ActivatedRoute } from "@angular/router";
import $ from 'jquery';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
    private authenticationService: AuthenticationService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      // this.router.navigate(['/user/contests']);
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  ngOnInit() {
    $.getScript('./assets/js/sidebar-menu.js');
    this.menuItems = MENUITEMS.filter(menuItem => menuItem);
    this.authenticationService.currentUser.subscribe(user=>{
      this.isLoggedIn = user!=null;
    });
  }

  toggleUserStatus(){
    if(this.isLoggedIn)
    this.logout();
    else{
      $(".page-body-wrapper").addClass("sidebar-close");
      $('.sidebar-background').addClass('hidden');
      $('#app-login-modal').removeClass('hidden');
      $('#app-login-modal').addClass('modal-appear');
    }
  }

  logout() {
    this.authenticationService.logout();
    this.isLoggedIn = false;
}

}
