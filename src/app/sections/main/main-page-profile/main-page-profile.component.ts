import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SportimoService } from 'src/app/services/sportimo.service';
import { ChartType, ChartOptions } from 'chart.js';
import { Label, SingleDataSet, Color } from 'ng2-charts'
import { Router, ActivatedRoute } from '@angular/router';

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
    private route:ActivatedRoute,) { }

  user: User;
  ngUnsubscribe = new Subject();

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

  colorScheme = {
    domain: ['#ABEC78']
  };

  stats: any;

  // Avatars
  avatarsShowing = false;

  avatars: string[] =[
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
      // console.table(this.user);
    });

    this.sportimoService.getAchievements().subscribe(x => {
      this.stats = x;
      let count = 0;
      if (x.lastmatches)
        this.single = x.lastmatches.map(each => {
          count++;
          return { name: "Game " + count, value: each };
        })

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

  closeAvatarsSelection(){
    this.avatarsShowing = false;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onUsernameUpdate(){
       
    this.authenticationService.updateUsername(this.user.username)
    .subscribe(
      response => {
        
        if (response && response.success) {
        };
      });      

  }

  selectAvatar(avatarUrl:string){
    this.authenticationService.updateAvatar(avatarUrl).subscribe();
  }


}
