import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SportimoService } from 'src/app/services/sportimo.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';

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

  currentView = this.MyTeamsViews['Teams'];
  currentTeam: any;
  isFavoriteTeam: boolean;
  isLoading: boolean;
  favoriteTeams: any;
  favoriteTeamsSubscription: any;

  constructor(
    private route: ActivatedRoute,
    private sportimoService: SportimoService,
    private authenticationService: AuthenticationService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {

      this.currentTeam = null;

      let teamId = params.get("teamId") || null;

      if (teamId) {
        this.currentView = this.MyTeamsViews['Team'];
        this.sportimoService.getTeam(teamId).subscribe(x => {
          this.currentTeam = x;
          // Check for favorite team
          this.isFavoriteTeam = false;
          this.authenticationService.currentUserValue.favoriteteams.forEach(team => {
            if (team._id == x._id)
              this.isFavoriteTeam = true;
          });
        }
        );
        return;
      }

      this.currentView = this.MyTeamsViews['Teams'];

      this.favoriteTeamsSubscription = this.authenticationService.currentUser.subscribe(x => {
        console.log("Favorite teams view Teams Update");
        if (x)
          this.favoriteTeams = x.favoriteteams;
        console.log(this.favoriteTeams);

      });

    })
  }

  ngOnDestroy() {
    if (this.favoriteTeamsSubscription)
      this.favoriteTeamsSubscription.unsubscribe();
  }

  toggleFavorite() {
    this.isLoading = true;
    this.authenticationService.updateFavorites(this.currentTeam, this.isFavoriteTeam).subscribe(response => {
      this.isLoading = false;
      this.isFavoriteTeam = false;
      this.authenticationService.currentUserValue.favoriteteams.forEach(team => {
        if (team._id == this.currentTeam._id)
          this.isFavoriteTeam = true;
      });
    })
  }

  viewTeam(teamId: string) {
    this.currentTeam = null;
    this.isLoading = true;
    this.currentView = this.MyTeamsViews['Team'];

    this.sportimoService.getFavoriteTeamData(teamId).subscribe(x => {
      this.isLoading = false;
      this.currentTeam = x;
    })
  }

}
