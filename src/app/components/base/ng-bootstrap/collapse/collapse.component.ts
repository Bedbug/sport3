import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss']
})
export class NgbCollapseComponent implements OnInit {
  
  public isCollapsed = false;
  
  constructor() { }

  ngOnInit() {
  }

}
