import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SportimoService } from 'src/app/services/sportimo.service';
import { ChartType, ChartOptions } from 'chart.js';
import { Label, SingleDataSet, Color } from 'ng2-charts'
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';
import * as _ from 'lodash';

@Component({
  selector: 'app-main-page-profile',
  templateUrl: './main-page-profile.component.html',
  styleUrls: ['./main-page-profile.component.scss']
})
export class MainPageProfileComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private sportimoService: SportimoService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) { }

  user: User;
  ngUnsubscribe = new Subject();
  Utils: SportimoUtils = new SportimoUtils();
  single: any[] = [];
  multi: any[];
  view: any[] = null;//[100, 400];

  // options
  showXAxis = false;
  showYAxis = false;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Last 5 games';
  showYAxisLabel = false;
  yAxisLabel = 'Population';
  oldValue = {
    all: true,
    new_message: true,
    match_reminder: true,
    kick_off: true,
    goals: true,
    won_cards: true,
    final_result: true
  };
  buttonDirty = false;

  conf = {
    value: false,
    name: '',
    disabled: false,
    height: 25,
    width: 60,
    margin: 3,
    fontSize: 14,
    speed: 300,
    color: {
      checked: '#ffc531 ',
      unchecked: '#000'
    },
    switchColor: {
      checked: '#000',
      unchecked: '#fff'
    },
    labels: {
      unchecked: 'off',
      checked: 'on'
    },
    checkedLabel: '',
    uncheckedLabel: '',
    fontColor: {
      checked: '#000',
      unchecked: '#ffffff'
    }
  };

  pushSettings = {
    all: true,
    new_message: true,
    match_reminder: true,
    kick_off: true,
    goals: true,
    won_cards: true,
    final_result: true
  };

  colorScheme = {
    domain: ['#ABEC78']
  };

  stats: any;

  // Avatars
  avatarsShowing = false;

  avatars: string[] = [
    './assets/images/sportimo/avatars/avatar1.png',
    './assets/images/sportimo/avatars/avatar2.png',
    './assets/images/sportimo/avatars/avatar3.png',
    './assets/images/sportimo/avatars/avatar4.png',
    './assets/images/sportimo/avatars/avatar5.png',
    './assets/images/sportimo/avatars/avatar6.png',
    './assets/images/sportimo/avatars/avatar7.png',
    './assets/images/sportimo/avatars/avatar8.png',
    './assets/images/sportimo/avatars/avatar9.png',
    './assets/images/sportimo/avatars/avatar10.png',
    './assets/images/sportimo/avatars/avatar11.png',
    './assets/images/sportimo/avatars/avatar12.png',
    './assets/images/sportimo/avatars/avatar13.png',
    './assets/images/sportimo/avatars/avatar14.png',
    './assets/images/sportimo/avatars/avatar15.png',
  ]

  // Pie charts
  public OverallChartLabels: Label[] = ['You', 'All players'];
  public OveralltChartData: SingleDataSet = [
    350, 450
  ];
  public InstantChartData: SingleDataSet = [
    350, 450
  ];
  public doughnutChartType: ChartType = 'polarArea';
  public ChartColors: Color[] = [{ borderWidth: 0, backgroundColor: ['RGBA(171, 236, 120, 0.9)', 'RGBA(255, 52, 88, 0.7)'] }]
  public ChartOprions: ChartOptions = {
    title: { display: false },
    showLines: false,
    spanGaps: false,
    rotation: 10,
    scales: {
      yAxes: [{
        display: false, //this will remove all the x-axis grid lines
        ticks: {
          display: false //this will remove only the label
        }
      }]
    },
    tooltips: {
      enabled: true,
    }
  };

  public data: any = {
    overall: { you: 0, all: 0 },
    instant: { you: 0, all: 0 }
  }

  ngOnInit() {
    this.authenticationService.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user => {
      this.user = user;
      console.log(user);
      if (this.user.picture == null)
        this.user.picture = '/assets/images/sportimo/default_avatar.svg';
      this.oldValue == this.user.pushSettings;
      // console.table(this.user.pushSettings);
    });

    this.sportimoService.getAchievements().subscribe(x => {
      // console.table(x);
      this.stats = x;
      let count = 0;
      if (x.lastmatches)
        this.single = x.lastmatches.map(each => {
          count++;
          return { name: "Game " + count, value: each };
        })


      // Find the most used card
      if (x.cardStats)
        this.stats.favoriteCard = _.maxBy(Object.keys(x.cardStats), o => x.cardStats[o]) || null;


      if (x && x.user && x.user.stats) {
        this.data.overall.you = (100 * (x.user.stats.overallCardsWon / x.user.stats.overallCardsPlayed)).toFixed(2);
        this.data.overall.all = x.all.overallSuccessPercent.toFixed(2);

        this.data.instant.you = (100 * (x.user.stats.instantCardsWon / x.user.stats.instantCardsPlayed)).toFixed(2);
        this.data.instant.all = x.all.instantSuccessPercent.toFixed(2);

        this.OveralltChartData = [
          this.data.overall.you, this.data.overall.all
        ]

        this.InstantChartData = [
          this.data.instant.you, this.data.instant.all
        ]
      }
    });
  }

  openAvatarSelection() {
    this.avatarsShowing = true;
    // this.router.navigate(['avatars'],{relativeTo:this.route.parent});
  }

  closeAvatarsSelection() {
    this.avatarsShowing = false;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onCh() {
    console.log("logged " + this.user.pushSettings.all);
    if (this.user.pushSettings.all != this.oldValue.all ||
      this.user.pushSettings.new_message != this.oldValue.new_message ||
      this.user.pushSettings.match_reminder != this.oldValue.match_reminder ||
      this.user.pushSettings.kick_off != this.oldValue.kick_off ||
      this.user.pushSettings.goals != this.oldValue.goals ||
      this.user.pushSettings.won_cards != this.oldValue.won_cards ||
      this.user.pushSettings.final_result != this.oldValue.final_result) {
      this.buttonDirty = true;
      console.log("Open Update");
    } else {
      this.buttonDirty = false;
      console.log("Close Update");
    }


    // this.NotValue != this.NotValue;
  }

  onUsernameUpdate() {

    this.authenticationService.updateUsername(this.user.username)
      .subscribe(
        response => {

          if (response && response.success) {
          };
        });

  }
  onUserAllUpdate() {
    
    this.authenticationService.updateUserAll(this.user.username, this.user.pushSettings, this.translate.currentLang)
      .subscribe(
        response => {

          if (response && response.success) {
          };
        });

  }

  parseDateDay(date: string) {
    return this.Utils.parseDate(date, this.translate.currentLang == 'fa', 'DD/MM/YY', 'jDD/jMM/jYY');
  }

  selectAvatar(avatarUrl: string) {
    this.authenticationService.updateAvatar(avatarUrl).subscribe();
  }


}
