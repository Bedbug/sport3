import { Component, OnInit } from '@angular/core';
import { MENUITEMS, Menu } from './compact-sidebar-icons-items';
import { Router, ActivatedRoute } from "@angular/router";
import * as $ from 'jquery';

@Component({
  selector: 'app-compact-sidebar-icons',
  templateUrl: './compact-sidebar-icons.component.html',
  styleUrls: ['./compact-sidebar-icons.component.scss']
})
export class CompactSidebarIconsComponent implements OnInit {

  public menuItems: Menu[];

  constructor(private router: Router, 
     private route: ActivatedRoute) {  
  	  this.menuItems = MENUITEMS.filter(menuItem => menuItem);
  }

  ngOnInit() {
    $.getScript('./assets/js/sidebar-menu.js');
    $.getScript('./assets/js/compact-small-button.js');
    document.getElementById("mobile-sidebar").innerHTML="<div class='media-body text-right switch-sm d-flex align-items-center'><i class='icon-align-right sidebar-toggle-btn pl-3'></i></div>";
  }

}
