import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Contest } from '../models/contest';
import { Observable, empty, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GrandPrize } from '../models/grand-prize';
import { ContestMatch } from '../models/contest-match';
import { Match } from '../models/match';
import { LiveMatch } from '../models/live-match';
import { AuthenticationService } from './authentication.service';
import { PlayCard } from '../models/playcard';

@Injectable({
  providedIn: 'root'
})
export class SportimoApiService {

  private cachedContests: BehaviorSubject<Contest[]>;
  private currentLiveMatch: BehaviorSubject<LiveMatch>;

  constructor(private http: HttpClient, private Config: ConfigService, private authenticationService: AuthenticationService) {
    this.cachedContests = new BehaviorSubject<Contest[]>(null);
    this.currentLiveMatch = new BehaviorSubject<LiveMatch>(null);
  }

  /*-----------------------------------------------------------------------------------
    Grand Prize
  ----------------------------------------------------------------------------------- */
  getGrandPrize() {
    return this.http.get<GrandPrize>(`${this.Config.getApi("ROOT")}/grandprize/${this.Config.getClient()}`);
  }

  /*-----------------------------------------------------------------------------------
    Contests
  ----------------------------------------------------------------------------------- */
  // Always returns a fresh list
  getContests() {
    return this.http.get<Contest[]>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournaments/present`)
      .pipe(map(contests => {
        this.cachedContests.next(contests);
        return contests;
      }));
    // 
  }

  // Quick Info does not to be fresh
  getContestQuickDetails(contestId: string): Observable<Contest> {

    if (this.cachedContests.value) {
      return this.cachedContests.pipe(map(contests => contests.find(x => x._id == contestId)));
    } else {
      // In case we load a contest page directly
      return this.getContests().pipe(map(contests => contests.find(x => x._id == contestId)));
    }
  }

  getContestDetails(contestId: string){
    if(!this.authenticationService.currentUserValue){
      return this.getContestQuickDetails(contestId);
    }else{
      return this.http.get<Contest>(
        `${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournaments/${contestId}/user/${this.authenticationService.currentUserValue._id}`)
      .pipe(map(contest => {
        return contest;
      }));
    }
  }

  /*-----------------------------------------------------------------------------------
    Matches
  ----------------------------------------------------------------------------------- */
  getPresentMatches(contestId: string) {
    return this.http.get<ContestMatch[]>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${contestId}/matches/present`)
      .pipe(map(matches => {
        return matches;
      }));
  }

  getPastMatches(contestId: string) {
    return this.http.get<ContestMatch[]>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${contestId}/matches/past`)
      .pipe(map(matches => {
        return matches;
      }));
  }

  getMatchDataForUser(contestId: string, contestMatchId: string) {
    return this.http.get<LiveMatch>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${contestId}/match/${contestMatchId}/user`)
      .pipe(map(match => {
        this.currentLiveMatch.next(match);
        return match;
      }));
  }

  getCurrentLiveMatchData() {
    return this.currentLiveMatch;
    // if (this.currentLiveMatch.value)
    //   return this.currentLiveMatch.value;
    // else
    //   return this.getMatchDataForUser(contestId, contestMatchId);
  }

  getAvailableCards(contestId:string, contestMatchId:string){
    return this.http.get<any>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${contestId}/match/${contestMatchId}/gamecards`)
      .pipe(map(availableCards => {
        return availableCards.data;
      }));
  }

  // Hashtable table = new Hashtable();
  // table.Add("matchid", matchCtrl.match_id);
  // table.Add("userid", Main.AppUser._id);
  // table.Add("gamecardDefinitionId", centerCardInfo._id);
  // table.Add("creationTime", DateTime.UtcNow.ToString(("yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fff'Z'")));
  // table.Add("segment", matchCtrl.liveMatch.matchData.state);

  // if (centerCardInfo.cardType == "PresetInstant")
  //     table.Add("minute", presetValue);
  // else
  //     table.Add("minute", (matchCtrl.minutes + 1));

  // if (opt.name.Contains("1"))
  // {
  //     table.Add("optionId", 1);
  //     option_selected = 1;
  // }
  // else if (opt.name.Contains("2"))
  // {
  //     table.Add("optionId", 2);
  //     option_selected = 2;
  // }
  // else if (opt.name.Contains("3"))
  // {
  //     table.Add("optionId", 3);
  //     option_selected = 3;
  // }
  // else
  // {
  //     table.Add("optionId", 4);
  //     option_selected = 4;
  // }
  // Debug.Log(JsonMapper.ToJson(table));


  // if (Main.Settings.V3)
  // {
  //     Debug.Log(JsonMapper.ToJson(table));
  //     string endpoint = string.Format("data/client/{0}/tournament/{1}/match/{2}/gamecards", Main.CLIENT_ID, TournamentDetailsController.currentTournament._id, matchCtrl.match_id);
  //     string formatedEndpoint = Main.Settings.apis["rootv3"] + endpoint;
  //     API.PostOne(formatedEndpoint, table, OnPlayCardPost);
  // }

}
