import { Component, OnInit } from '@angular/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-page-achievements',
  templateUrl: './main-page-achievements.component.html',
  styleUrls: ['./main-page-achievements.component.scss']
})
export class MainPageAchievementsComponent implements OnInit {

  achievements:any[];

  constructor(private sportimoService:SportimoService, public translate:TranslateService) { }
  
  ngOnInit() {
    this.sportimoService.getAchievements().subscribe(x=>{      
      this.achievements = x.user.achievements;
      console.log(this.achievements);
    });
  }

  getPercent(achievement:any){
    return (achievement.has / achievement.total) * 100;
  }

}
