import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { SportimoService } from 'src/app/services/sportimo.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private configService:ConfigService, private sportimoService:SportimoService) { }
  public hasNews:boolean  = false;
  ngOnInit() {
    // this.hasNews = this.configService.get("NEWS");
    this.hasNews = this.sportimoService.getConfigurationFor("News");
  }

}
