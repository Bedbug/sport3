import { ComponentFixture, TestBed, inject, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from 'src/app/services/config.service';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationService: AuthenticationService;
  let httpClientSpy: { post: jasmine.Spy, get: jasmine.Spy };
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [FormsModule,ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [ ConfigService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    authenticationService = new AuthenticationService(<any>httpClientSpy, <any>ConfigService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('User can login', () => {
  //   const expectedUser: User =
  //   {
  //     role: "admin",
  //     wallet: 20,
  //     inbox: [
  //       "5af9983f0657c8da57d5ac20",
  //       "5af9a73680631b7441e60021",
  //       "5af9a79a80631b7441e60022",
  //       "5b28f5bc80631bfa47c1132c",
  //       "5b36380e80631bd091183513",
  //       "5b363f4f18f6e4d5bd5b03ac"
  //     ],
  //     "unread": 0,
  //     "pushToken": "dFmHnyN97fs:APA91bEvC1ZO6yrlesXgHaWfr7qX8-dhMzF13CWc9mzXpQyyqUIAeXbpXyy_By91Ise18pm7j41tQ9w3TU6gGRFG86DmMouM42ZWtMDnI6fzqz0KzTetR-jkIuL7xD2H3L5Gw2zdwIDB",
  //     "country": "GR",
  //     "_id": "58a7325fbbcfc09e55bde5a5",
  //     "client": "5be2bfc7135a3e1e2d4a637f",
  //     "username": "Rabid-Rabbit",     
  //     "email": "aws@aws.com",
  //     "favTeams": [
  //       {
  //         "team": {
  //           "_id": "5be1c1f9adc3f01ae4f85b40",
  //           "name": {
  //             "en": "Chelsea Football Club"
  //           },
  //           "logo": "https://s3-eu-west-1.amazonaws.com/sportimo-media/teams/588a8d890bb50f00feda8dc8.png"
  //         },
  //         "competition": {_id:"56f4800fe4b02f2226646297"}
  //       }
  //     ],
  //     "achievements": [
  //       {
  //         "value": 2,
  //         "completed": false,
  //         "total": 10,
  //         "has": 1,
  //         "text": {
  //           "ar": "توقع 10 كروت حمراء بغض النظر عن المباراة",
  //           "en": "The color of passion is red! Guess 10 red cards regardless of match."
  //         },
  //         "title": {
  //           "ar": "خبير التحكيم",
  //           "en": "All Red"
  //         },
  //         "icon": "https://s3-eu-west-1.amazonaws.com/sportimo-media/achievements/5755489ef36d2812afe82da1.png",
  //         "uniqueid": "passion_color",
  //         "_id": "5755489ef36d2812afe82da1"
  //       },
  //       {
  //         "value": 1,
  //         "__v": 0,
  //         "completed": false,
  //         "total": 20,
  //         "has": 12,
  //         "text": {
  //           "ar": "تابع المباراة كاملة من سبورتيمو  حتى تسمع الصافرات الثلاث النهائية للحكم.",
  //           "en": "Follow the whole game from Sportimo. Stick until the three final whistles of the referee."
  //         },
  //         "title": {
  //           "ar": "مثابر",
  //           "en": "Completionist"
  //         },
  //         "icon": "https://s3-eu-west-1.amazonaws.com/sportimo-media/achievements/57653e15106b4af400f1479d.png",
  //         "uniqueid": "persist_gamer",
  //         "_id": "57653e15106b4af400f1479d"
  //       },
  //       {
  //         "value": 2,
  //         "completed": true,
  //         "total": 10,
  //         "has": 10,
  //         "text": {
  //           "ar": "هل تستطيع تسجيل 10 أهداف؟ توقع 10 أهداف في أي مباراة",
  //           "en": "Can you score 10 goals? Predict 10 goals regardless of the match"
  //         },
  //         "title": {
  //           "ar": "الهداف",
  //           "en": "Top Scorer"
  //         },
  //         "icon": "https://s3-eu-west-1.amazonaws.com/sportimo-media/achievements/57552fd4f36d2812afe8205b.png",
  //         "uniqueid": "top_scorer",
  //         "_id": "57552fd4f36d2812afe8205b"
  //       },
  //       {
  //         "value": 5,
  //         "uniqueid": "late_party",
  //         "icon": "https://s3-eu-west-1.amazonaws.com/sportimo-media/achievements/57656892f36d280aec943657.png",
  //         "title": {
  //           "ar": "ملك الإصرار",
  //           "en": "Late to the party"
  //         },
  //         "text": {
  //           "ar": "اربح بطاقة مباراة في آخر 15 دقيقة",
  //           "en": "Win a goal related card in the last 15 minutes of the game"
  //         },
  //         "has": 5,
  //         "total": 5,
  //         "completed": true,
  //         "_id": "57656892f36d280aec943657"
  //       },
  //       {
  //         "value": 1,
  //         "uniqueid": "loosers_reward",
  //         "icon": "https://s3-eu-west-1.amazonaws.com/sportimo-media/achievements/5765693df36d280aec943664.png",
  //         "title": {
  //           "ar": "أسعد خاسر",
  //           "en": "Losers should have fun too."
  //         },
  //         "text": {
  //           "ar": "مركز ادنى من ال100 لاعب المتصدرين في بطاقة المباراة",
  //           "en": "Rank below the first 100 players in a match leaderboard."
  //         },
  //         "has": 0,
  //         "total": 50,
  //         "completed": false,
  //         "_id": "5765693df36d280aec943664"
  //       },
  //       {
  //         "value": 1,
  //         "uniqueid": "top_100",
  //         "icon": "https://s3-eu-west-1.amazonaws.com/sportimo-media/achievements/57656998f36d280aec943668.png",
  //         "title": {
  //           "ar": "ملك التوقعات",
  //           "en": "Master Intuition"
  //         },
  //         "text": {
  //           "ar": "كن بين ال100 لاعب المتصدرين في مباراة واحدة",
  //           "en": "Rank in the top 100 players in a single match leaderboard."
  //         },
  //         "has": 10,
  //         "total": 10,
  //         "completed": true,
  //         "_id": "57656998f36d280aec943668"
  //       },
  //       {
  //         "value": 2,
  //         "uniqueid": "top_10",
  //         "icon": "https://s3-eu-west-1.amazonaws.com/sportimo-media/achievements/576569bdf36d280aec94366b.png",
  //         "title": {
  //           "ar": "من الطراز الأول",
  //           "en": "Top Class"
  //         },
  //         "text": {
  //           "ar": "كن بين ال10 لاعبين المتصدرين في مباراة واحدة",
  //           "en": "Rank in the top 10 players in a single match leaderboard."
  //         },
  //         "has": 5,
  //         "total": 5,
  //         "completed": true,
  //         "_id": "576569bdf36d280aec94366b"
  //       },
  //       {
  //         "value": 50,
  //         "uniqueid": "mike_drop",
  //         "icon": "https://s3-eu-west-1.amazonaws.com/sportimo-media/achievements/576569fdf36d280aec943672.png",
  //         "title": {
  //           "ar": "حريف كرة",
  //           "en": "Mic Drop"
  //         },
  //         "text": {
  //           "ar": "كن الأول بين متصدرين المباراة",
  //           "en": "Rank first in a single match leaderboard."
  //         },
  //         "has": 1,
  //         "total": 1,
  //         "completed": true,
  //         "_id": "576569fdf36d280aec943672"
  //       }
  //     ],
  //     "gender": "female",
  //     "stats": {
  //       "matchesVisited": 72,
  //       "matchesPlayed": 24,
  //       "overallCardsPlayed": 19,
  //       "cardsPlayed": 118,
  //       "presetinstantCardsPlayed": 29,
  //       "presetinstantCardsWon": 18,
  //       "cardsWon": 45,
  //       "overallCardsWon": 6,
  //       "instantCardsPlayed": 70,
  //       "instantCardsWon": 21
  //     },
  //     "picture": "https://s3-eu-west-1.amazonaws.com/sportimo-media/avatars/avatar2.png",
  //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4YTczMjVmYmJjZmMwOWU1NWJkZTVhNSIsImlhdCI6MTU2MDE4ODA0MiwiZXhwIjoxNTYwMjc0NDQyfQ.3jiVSLO3guaoqulF1cWzkHwbuwrO20kX6ixzvydRx9Y",
  //   }

  //   httpClientSpy.post.and.returnValue(of(expectedUser));

  //   authenticationService.login("test", "test").subscribe(user => {
      
  //     expect(user).toEqual(expectedUser);      
      
  //   });
  // })

  // it('Current user is Rabid-Rabbit',()=>{
  //   console.log(authenticationService.currentUserValue.username);
  //   expect(authenticationService.currentUserValue.username).toEqual('Rabid-Rabbit', 'username is Rabid-Rabbit');
  // })


});
