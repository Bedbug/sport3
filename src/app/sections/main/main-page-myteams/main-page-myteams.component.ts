import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SportimoService } from 'src/app/services/sportimo.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main-page-myteams',
  templateUrl: './main-page-myteams.component.html',
  styleUrls: ['./main-page-myteams.component.scss']
})
export class MainPageMyteamsComponent implements OnInit {

  MyTeamsViews = {
    Teams: 0,
    Team: 1
  }

  private ngUnsubscribe = new Subject();

  currentView = this.MyTeamsViews['Teams'];
  currentTeam: any;
  isFavoriteTeam: boolean;
  isLoading: boolean;
  favoriteTeams: any;
  currentUser: boolean;


  constructor(
    private route: ActivatedRoute,
    private sportimoService: SportimoService,
    private authenticationService: AuthenticationService,
    public translate: TranslateService,
    private router: Router,
  ) { }

  count = 0;
  ngOnInit() {

    this.authenticationService.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user => {
      this.currentUser = user != null;
    });

    this.route.queryParamMap.subscribe(params => {

      this.currentTeam = null;

      let teamId = params.get("team") || null;
      let competitionId = params.get("competition") || null;

      if (teamId && competitionId) {

        this.currentTeam = null;
        this.isLoading = true;
        this.currentView = this.MyTeamsViews['Team'];

        this.sportimoService.getFavoriteTeamData(teamId, competitionId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => {
          this.isLoading = false;
          this.currentTeam = x;
          this.isFavoriteTeam = true;
        });
        return;
      }

      this.currentView = this.MyTeamsViews['Teams'];
      this.authenticationService.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => {
        console.log("Favorite teams view Teams Update");
        if (x)
          this.favoriteTeams = x.favTeams;
        console.log(this.favoriteTeams);
      });

    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  toggleFavorite() {
    this.isLoading = true;
    this.authenticationService.updateFavorites(this.currentTeam.team, this.currentTeam.competition, this.isFavoriteTeam).subscribe(response => {
      this.isLoading = false;
      this.isFavoriteTeam = false;
      this.authenticationService.currentUserValue.favoriteteams.forEach(team => {
        if (team._id == this.currentTeam._id)
          this.isFavoriteTeam = true;
      });
    })
  }

  // viewTeam(fav: any) {
  //   this.currentTeam = null;
  //   this.isLoading = true;
  //   this.currentView = this.MyTeamsViews['Team'];

  //   this.sportimoService.getFavoriteTeamData(fav.team._id, fav.competition._id).subscribe(x => {
  //     this.isLoading = false;
  //     this.currentTeam = x;
  //   })
  // }

  showTeam(fav: any) {
    this.currentTeam = null;
    this.isLoading = true;
    this.currentView = this.MyTeamsViews['Team'];
    this.router.navigate([], { queryParams: { team: fav.team._id, competition: fav.competition._id } });
  }

}
