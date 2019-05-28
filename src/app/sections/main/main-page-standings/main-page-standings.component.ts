import { Component, OnInit } from '@angular/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Route, Router } from '@angular/router';



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

  currentView = this.StandingsViews['Leagues'];

  constructor(private sportimoService: SportimoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {

      this.currentStandings = null

      let leagueId = params.get("leagueId") || null;
      if (leagueId) {
        console.log(leagueId);
        this.currentView = this.StandingsViews['Standings'];
        this.sportimoService.getStandings(leagueId).subscribe(x => {
          console.log(x);
          this.currentStandings = x;
        }
        );
        return;
      }

      let teamId = params.get("teamId") || null;
      if (teamId) {
        console.log(teamId);
        this.currentView = this.StandingsViews['Team'];
        // this.sportimoService.getTeam(teamId).pipe(map(x => {
        //   console.log(x);
        //   this.currentStandings = x;
        // }
        // ));
        return;
      }

      let playerId = params.get("playerId") || null;
      if (teamId) {
        this.currentView = this.StandingsViews['Player'];
        // this.sportimoService.getPlayer(playerId).pipe(map(x => {
        //   console.log(x);
        //   this.currentStandings = x;
        // }
        // ));
        return;
      }


      this.currentView = this.StandingsViews['Leagues'];

    })
  }

  showStantings(leagueId: string) {
    this.router.navigate([], { queryParams: { leagueId: leagueId } });
  }

  showTeam(teamId: string){
    this.router.navigate([], { queryParams: { teamId: teamId } });
  }

  showPlayer(playerId: string){
    this.router.navigate([], { queryParams: { playerId: playerId } });
  }

}
