import { Component, OnInit } from '@angular/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import { TranslateService } from '@ngx-translate/core';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';

@Component({
  selector: 'app-main-page-winners',
  templateUrl: './main-page-winners.component.html',
  styleUrls: ['./main-page-winners.component.scss']
})
export class MainPageWinnersComponent implements OnInit {
  
  winners: any = [];
  Utils: SportimoUtils = new SportimoUtils();

  constructor(
    public sportimoService:SportimoService,
    public translate:TranslateService
    ) { }

  ngOnInit() {
    this.sportimoService.getWinners().subscribe((winners)=>{
      this.winners = winners;
    });
  }

  parseDate(date:string){
    return this.Utils.parseDate(date,this.translate.currentLang=='fa','DD/MM/YY');
  }

}
