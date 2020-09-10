import { Component, OnInit } from '@angular/core';
import { TermsPopupComponent } from '../terms-popup/terms-popup.component';
import { PrizeViewOverlayService } from 'src/app/sections/main/prize-view-overlay/prize-view-overlay.service';

@Component({
  selector: 'app-terms-footer',
  templateUrl: './terms-footer.component.html',
  styleUrls: ['./terms-footer.component.scss']
})
export class TermsFooterComponent implements OnInit {

  constructor(
    private ViewModalOverlay: PrizeViewOverlayService
  ) { }

  ngOnInit() {
  }

  openTerms(){
    this.ViewModalOverlay.open<TermsPopupComponent>(TermsPopupComponent,{});
  }

}
