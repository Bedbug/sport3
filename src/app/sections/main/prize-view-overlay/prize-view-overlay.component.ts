import { Component, OnInit, Inject } from '@angular/core';
import { FilePreviewOverlayRef } from './prize-preview-overlay-ref';
import { FILE_PREVIEW_DIALOG_DATA } from './prize-preview-overlay.tokens';


@Component({
  selector: 'app-prize-view-overlay',
  templateUrl: './prize-view-overlay.component.html',
  styleUrls: ['./prize-view-overlay.component.scss']
})
export class PrizeViewOverlayComponent implements OnInit {

  constructor(
    public dialogRef: FilePreviewOverlayRef,
    @Inject(FILE_PREVIEW_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this.data);
    
  }

}
