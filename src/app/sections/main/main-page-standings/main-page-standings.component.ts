import { Component, OnInit } from '@angular/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';



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

  constructor(private sportimoService: SportimoService, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {

    this.authenticationService.currentUser.subscribe(user => {
      this.isLoggedIn = user != null;
    });

    this.route.queryParamMap.subscribe(params => {

      this.currentStandings = null;
      this.currentTeam = null;
      this.currentPlayer = null;

      let leagueId = params.get("leagueId") || null;
      if (leagueId) {
        console.log(leagueId);
        this.currentView = this.StandingsViews['Standings'];
        this.sportimoService.getStandings(leagueId).subscribe(x => {
          this.currentStandings = x;
        }
        );
        return;
      }

      let teamId = params.get("teamId") || null;

      if (teamId) {
        this.currentView = this.StandingsViews['Team'];
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

      let playerId = params.get("playerId") || null;
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
    this.router.navigate([], { queryParams: { teamId: teamId } });
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
    this.authenticationService.updateFavorites(this.currentTeam, this.isFavoriteTeam).subscribe(response => {
      this.isLoading = false;
      this.isFavoriteTeam = false;
      this.authenticationService.currentUserValue.favoriteteams.forEach(team => {
        if (team._id == this.currentTeam._id)
          this.isFavoriteTeam = true;
      });
    })

  }
}
