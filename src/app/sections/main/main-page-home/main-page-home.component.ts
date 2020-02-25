import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { ToastrService } from 'ngx-toastr';
import { NotyfToastSuccess } from 'src/app/components/custom-toast/notyf.toast';
import { NotyfToastError } from 'src/app/components/custom-toast/notyf.error';

@Component({
  selector: 'app-page',
  templateUrl: './main-page-home.component.html',
  styleUrls: ['./main-page-home.component.scss'],

})
export class MainPageHomeComponent implements OnInit {

  contestID: string;

  title = '';
  message = '';
  private lastInserted: number[] = [];


  constructor(
    private routeParams: ActivatedRoute, 
    private config: ConfigService, 
    private toastr: ToastrService,
    
    ) {
    this.contestID = routeParams.snapshot.params['contestID'];
  }

  ngOnInit() {
  }

  openNotyf(title: string, message: string, error: boolean) {
    let options = this.toastr.toastrConfig;
    // options.timeOut = 0;
    if (error)
      options.toastComponent = NotyfToastError;
    else
      options.toastComponent = NotyfToastSuccess;
    options.toastClass = 'notyf confirm';
    // opt.positionClass = 'notyf__wrapper';
    // this.options.newestOnTop = false;
    const inserted = this.toastr.show(title, message, options);
    if (inserted && inserted.toastId) {
      this.lastInserted.push(inserted.toastId);
    }
    return inserted;
  }

}
