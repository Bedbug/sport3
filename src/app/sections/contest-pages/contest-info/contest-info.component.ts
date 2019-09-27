import { Component, OnInit, Inject } from '@angular/core';
import { FilePreviewOverlayRef } from '../../main/prize-view-overlay/prize-preview-overlay-ref';
import { FILE_PREVIEW_DIALOG_DATA } from '../../main/prize-view-overlay/prize-preview-overlay.tokens';
import { ActivatedRoute } from '@angular/router';
import { SportimoService } from 'src/app/services/sportimo.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { Contest } from 'src/app/models/contest';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contest-info',
  templateUrl: './contest-info.component.html',
  styleUrls: ['./contest-info.component.scss']
})
export class ContestInfoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public sportimoService: SportimoService,
    public translate: TranslateService,
    public dialogRef: FilePreviewOverlayRef,
    @Inject(FILE_PREVIEW_DIALOG_DATA) public data: any) { }


  // private langIsRTL: boolean = false;
  ngUnsubscribe = new Subject();
  contestDetails: Contest;

  ngOnInit() {
    // console.log(this.data);
    this.contestDetails = this.data;
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
