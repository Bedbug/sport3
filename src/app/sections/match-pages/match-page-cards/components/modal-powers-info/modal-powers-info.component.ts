import { Component, OnInit, Inject } from '@angular/core';
import { FilePreviewOverlayRef } from 'src/app/sections/main/prize-view-overlay/prize-preview-overlay-ref';
import { FILE_PREVIEW_DIALOG_DATA } from 'src/app/sections/main/prize-view-overlay/prize-preview-overlay.tokens';

@Component({
  selector: 'app-modal-powers-info',
  templateUrl: './modal-powers-info.component.html',
  styleUrls: ['./modal-powers-info.component.scss']
})
export class ModalPowersInfoComponent implements OnInit {

  constructor(
   
    public dialogRef: FilePreviewOverlayRef,
    @Inject(FILE_PREVIEW_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    
  }

  strippedPrizedText(text: string) {
    if (text) {
      let str: string = text.replace(/<\/?[^>]+(>|$)/g, "");
      if (str.length > 100)
        str = str.substring(0, 100) + "...";
      return str;
    } else
      return "";
  }


  

}
