import { Component, OnInit } from '@angular/core';
import { MENUITEMS, Menu } from './sidebar-items';
import { Router, ActivatedRoute } from "@angular/router";
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
   
   public menuItems: Menu[];

   constructor(private router: Router,
        private route: ActivatedRoute) {
    }

   ngOnInit() {
       $.getScript('./assets/js/sidebar-menu.js');
       this.menuItems = MENUITEMS.filter(menuItem => menuItem);
   }

}
