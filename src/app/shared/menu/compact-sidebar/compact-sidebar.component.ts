import { Component, OnInit } from '@angular/core';
import { MENUITEMS, Menu } from './compact-sidebar-items';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-compact-sidebar',
  templateUrl: './compact-sidebar.component.html',
  styleUrls: ['./compact-sidebar.component.scss']
})
export class CompactSidebarComponent implements OnInit {

   public menuItems: Menu[];

   constructor(private router: Router, 
   	private route: ActivatedRoute) {  }

   ngOnInit() {
       this.menuItems = MENUITEMS.filter(menuItem => menuItem);
   }

}
