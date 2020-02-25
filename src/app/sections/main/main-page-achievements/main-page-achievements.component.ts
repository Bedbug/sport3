import { Component, OnInit } from '@angular/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import { TranslateService } from '@ngx-translate/core';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';

@Component({
  selector: 'app-main-page-achievements',
  templateUrl: './main-page-achievements.component.html',
  styleUrls: ['./main-page-achievements.component.scss']
})
export class MainPageAchievementsComponent implements OnInit {

  achievements:any[];

  data = {
    type: "card-result",
    icon:"",
    lost: true
  }

  Utils: SportimoUtils = new SportimoUtils();

  constructor(private sportimoService:SportimoService, public translate:TranslateService) { }
  
  ngOnInit() {
    this.sportimoService.getAchievements().subscribe(x=>{    
      if(x)  
      this.achievements = x.user.achievements;
    });


    // test for card toasts
    this.data.icon = this.Utils.getIconBySprite("penalty");
  }

  getPercent(achievement:any){
    return (achievement.has / achievement.total) * 100;
  }

  parseNumbers(text:string){
    return this.Utils.parseNumbers(text,this.translate.currentLang == 'fa');
  }

}
