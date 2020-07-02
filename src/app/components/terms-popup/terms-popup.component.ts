import { Component, OnInit } from '@angular/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import { TranslateService } from '@ngx-translate/core';
import { FilePreviewOverlayRef } from '../../sections/main/prize-view-overlay/prize-preview-overlay-ref';

@Component({
  selector: 'app-terms-popup',
  templateUrl: './terms-popup.component.html',
  styleUrls: ['./terms-popup.component.scss']
})
export class TermsPopupComponent implements OnInit {

  terms:any;  

  constructor(
    private sportimoService:SportimoService,
    private translate:TranslateService,
    public dialogRef: FilePreviewOverlayRef,
    ) { }

  ngOnInit() {
    this.sportimoService.getClientTerms().subscribe(text=>{    
      this.terms = text.termsAndConditions;
    })
  }

  close() {
    this.dialogRef.close();
  }

}
