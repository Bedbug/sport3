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

  achievements: any[];
  Utils: SportimoUtils = new SportimoUtils();

  // data = {
  //     "id": "5e5525c4b9c5eb0004f86a52",
  //     "userid": "5d7389fbd6126dd7ffe3df9d",
  //     "matchid": "5e55256283019a001f4f1288",
  //     "gamecardDefinitionId": "5e55256383019a001f4f12cc",
  //     "title": {
  //       "ar": "ضربة ركنية",
  //       "en": "Corner",
  //       "fa": "کرنر",
  //       "ru": "Угловой"
  //     },
  //     "image": {
  //       "url": "",
  //       "sprite": "corner",
  //       "en": "",
  //       "ar": "",
  //       "fa": ""
  //     },
  //     "text": {
  //       "ar": "لا",
  //       "en": "No corner",
  //       "fa": "",
  //       "ru": "Не будет углового"
  //     },
  //     "minute": 1,
  //     "segment": 1,
  //     "primaryStatistic": "Corner",
  //     "cardType": "PresetInstant",
  //     "isDoubleTime": false,
  //     "isDoublePoints": false,
  //     "status": 2,
  //     "specials": {
  //       "DoublePoints": {
  //         "status": 0,
  //         "_id": "5e5525c4b9c5eb0004f86a53",
  //         "activationLatency": 0
  //       },
  //       "DoubleTime": {
  //         "status": 0,
  //         "_id": "5e5525c4b9c5eb0004f86a54",
  //         "activationLatency": 0
  //       }
  //     },
  //     "startPoints": 25,
  //     "endPoints": 25,
  //     "activationLatency": 20000,
  //     "duration": 600000,
  //     "optionId": "4",
  //     "creationTime": "2020-02-25T13:48:52.067Z",
  //     "activationTime": "2020-02-25T13:50:02.568Z",
  //     "terminationTime": "2020-02-25T14:00:02.568Z"    
  // }

  data = {"id":"5e5525bbb9c5eb0004f86a4d","userid":"5d7389fbd6126dd7ffe3df9d","matchid":"5e55256283019a001f4f1288","gamecardDefinitionId":"5e55256383019a001f4f12d1","title":{"ar":"تسلل","en":"Offside","fa":"آفساید","ru":"Офсайд"},"image":{"url":"","sprite":"offside","en":"","ar":"","fa":""},"text":{"ar":"نعم اي فريق","en":"Yes any team","fa":"بله هر تیمی","ru":"Любая команда"},"minute":1,"segment":1,"primaryStatistic":"Offside","cardType":"PresetInstant","isDoubleTime":false,"isDoublePoints":false,"status":2,"specials":{"DoublePoints":{"status":0,"_id":"5e5525bbb9c5eb0004f86a4e","activationLatency":0},"DoubleTime":{"status":0,"_id":"5e5525bbb9c5eb0004f86a4f","activationLatency":0}},"startPoints":120,"endPoints":60,"activationLatency":20000,"pointsAwarded":532,"duration":600000,"optionId":"3","creationTime":"2020-02-25T13:48:43.302Z","activationTime":"2020-02-25T13:50:02.568Z","terminationTime":"2020-02-25T14:00:02.568Z","wonTime":"2020-02-25T13:57:27.992Z"}


  constructor(private sportimoService: SportimoService, public translate: TranslateService) { }

  ngOnInit() {
    this.sportimoService.getAchievements().subscribe(x => {
      if (x)
        this.achievements = x.user.achievements;
    });


    // test for card toasts
    // this.data.icon = this.Utils.getIconBySprite("penalty");
  }

  getPercent(achievement: any) {
    return (achievement.has / achievement.total) * 100;
  }

  parseNumbers(text: string) {     
      return this.Utils.parseNumbers(text, this.translate.currentLang == 'fa');   
  }

}
