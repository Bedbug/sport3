import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { SportimoService } from 'src/app/services/sportimo.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  ngUnsubscribe = new Subject();
  
  constructor(private configService:ConfigService, private sportimoService:SportimoService) { }
  public hasNews:boolean  = false;
  ngOnInit() {
    this.sportimoService.configuration.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data=> {
      // console.log("News Set");   
      this.hasNews = data.displayNews;

    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}
