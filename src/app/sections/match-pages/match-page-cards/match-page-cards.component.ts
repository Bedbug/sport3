import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-match-page-cards',
  templateUrl: './match-page-cards.component.html',
  styleUrls: ['./match-page-cards.component.scss']
})
export class MatchPageCardsComponent implements OnInit {

  // @ViewChild('stickyMenu') menuElement: ElementRef;

  // sticky: boolean = false;
  // menuPosition: any;

  constructor() { }

  ngOnInit() {
  }

  // ngAfterViewInit() {
  //   this.menuPosition = this.menuElement.nativeElement.offsetTop
  // }


  // @HostListener('window:scroll', ['$event'])
  // handleScroll(){
    
  //     const windowScroll = window.pageYOffset;

  //     console.log(windowScroll,this.menuPosition);

  //     if(windowScroll >= 105){
  //         this.sticky = true;
  //     } else {
  //         this.sticky = false;
  //     }
  // }
  
}
