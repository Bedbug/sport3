import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SportimoService } from 'src/app/services/sportimo.service';

@Component({
  selector: 'app-main-page-profile',
  templateUrl: './main-page-profile.component.html',
  styleUrls: ['./main-page-profile.component.scss']
})
export class MainPageProfileComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private sportimoService: SportimoService) { }

  user: User;
  ngUnsubscribe = new Subject();

  single: any[] = [
    {
      "name": "21/5",
      "value": 8940000
    },
    {
      "name": "22/5",
      "value": 5000000
    },
    {
      "name": "23/5",
      "value": 5000000
    },
    {
      "name": "24/5",
      "value": 5000000
    },
    {
      "name": "25/5",
      "value": 5000000
    }
  ];
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

  ngOnInit() {
    this.authenticationService.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user => {
      this.user = user;
    });

    this.sportimoService.getAchievements().subscribe(x => {
      this.stats = x;
      let count = 0;
      if (x.lastmatches)
        this.single = x.lastmatches.map(each => {
          count++;
          return { name: "Game " + count, value: each };
        })
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
