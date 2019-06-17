import { Component, OnInit } from '@angular/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-main-page-standings',
  templateUrl: './main-page-standings.component.html',
  styleUrls: ['./main-page-standings.component.scss']
})

export class MainPageStandingsComponent implements OnInit {

  StandingsViews = {
    Leagues: 0,
    Standings: 1,
    Team: 2,
    Player: 3
  }

  leagues: any[] = [
    {
      id: "56f4800fe4b02f2226646297",
      img: "./assets/images/sportimo/flags/england.png",
      title: { "en": "Premier League" },
      text: { "en": "England, 18/09/19-01/06/19" }
    },
    {
      id: "577ec1a61916317238fd2f36",
      img: "./assets/images/sportimo/flags/spain.png",
      title: { "en": "La Liga" },
      text: { "en": "Spain, 18/09/19-01/06/19" }
    }
  ]

  currentStandings: any;
  currentPlayer: any;
  currentTeam: any;
  currentView = this.StandingsViews['Leagues'];
  isFavoriteTeam: boolean = false;
  isLoggedIn: boolean = false;
  isLoading: boolean;
  private ngUnsubscribe = new Subject();

  constructor(
    private sportimoService: SportimoService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public translate: TranslateService
  ) { }

  ngOnInit() {

    this.authenticationService.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user => {
      this.isLoggedIn = user != null;
    });

    this.route.queryParamMap.subscribe(params => {

      this.currentPlayer = null;

      let leagueId = params.get("leagueId") || null;
      let teamId = params.get("teamId") || null;
      let playerId = params.get("playerId") || null;

      if (leagueId) {
        if (!this.currentStandings || leagueId != this.currentStandings.competition._id)
          this.sportimoService.getStandings(leagueId).subscribe(x => {
            this.currentStandings = x;
          });

        if (!teamId) {
          this.currentView = this.StandingsViews['Standings'];
          return;
        }
      }

      if (teamId && leagueId) {
        this.currentView = this.StandingsViews['Team'];
        if (!this.currentTeam || this.currentTeam._id != teamId) {
          this.currentTeam = null;
          this.sportimoService.getTeam(teamId).subscribe(x => {
            this.currentTeam = x;
            // Check for favorite team
            this.isFavoriteTeam = false;
            if (this.authenticationService.currentUserValue)
              this.authenticationService.currentUserValue.favTeams.forEach(fav => {
                if (fav.team._id == teamId && fav.competition._id == leagueId)
                  this.isFavoriteTeam = true;
              });
          }
          );
        }
        return;
      }

      if (playerId) {
        this.currentView = this.StandingsViews['Player'];
        this.sportimoService.getPlayer(playerId).subscribe(x => {
          this.currentPlayer = x.player;
        }
        );
        return;
      }

      this.currentView = this.StandingsViews['Leagues'];

    })
  }

  showStantings(leagueId: string) {
    this.router.navigate([], { queryParams: { leagueId: leagueId } });
  }

  showTeam(teamId: string) {
    this.router.navigate([], { queryParams: { leagueId: this.currentStandings.competition._id, teamId: teamId } });
  }

  showPlayer(playerId: string) {
    this.router.navigate([], { queryParams: { playerId: playerId } });
  }

  get getGK() {
    if (this.currentTeam)
      return this.currentTeam.players.filter(x => x.position == "Goalkeeper");
    return [];
  }
  get getDEF() {
    if (this.currentTeam)
      return this.currentTeam.players.filter(x => x.position == "Defender");
    return [];
  } get getMED() {
    if (this.currentTeam)
      return this.currentTeam.players.filter(x => x.position == "Midfielder");
    return [];
  } get getFW() {
    if (this.currentTeam)
      return this.currentTeam.players.filter(x => x.position == "Forward" || x.position == "Attacker");
    return [];
  }

  toggleFavorite() {
    this.isLoading = true;
    this.authenticationService.updateFavorites(this.currentTeam, this.currentStandings.competition, this.isFavoriteTeam).pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      this.isLoading = false;
      this.isFavoriteTeam = false;
      this.authenticationService.currentUserValue.favTeams.forEach(fav => {
        if (fav.team._id == this.currentTeam._id && fav.competition._id == this.currentStandings.competition._id)
          this.isFavoriteTeam = true;
      });
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
