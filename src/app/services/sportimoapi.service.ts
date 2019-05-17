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
import { PlaycardComponent } from '../sections/match-pages/match-page-cards/components/playcard/playcard.component';

@Injectable({
  providedIn: 'root'
})
export class SportimoApiService {

  private cachedContests: BehaviorSubject<Contest[]>;
  private currentLiveMatch: BehaviorSubject<LiveMatch>;

  private currentMatchId;
  private currentContestId;

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

  getContestDetails(contestId: string) {
    if (!this.authenticationService.currentUserValue) {
      return this.getContestQuickDetails(contestId);
    } else {
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
    this.currentContestId = contestId;
    this.currentMatchId = contestMatchId;
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

  getAvailableCards(contestId: string, contestMatchId: string) {
    return this.http.get<any>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${contestId}/match/${contestMatchId}/gamecards`)
      .pipe(map(availableCards => {
        return availableCards.data;
      }));
  }

  submitUserCard(cardSelections: any) {
    cardSelections.matchid = this.currentLiveMatch.value._id;
    cardSelections.contestId = this.currentContestId;
    cardSelections.segment = this.currentLiveMatch.value.matchData.state;
    return this.http.post<any>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${this.currentContestId}/match/${this.currentMatchId}/gamecards`, cardSelections)
    .pipe(map(response=>{        
        this.currentLiveMatch.getValue().playedCards.push(response.userGamecard);
        this.currentLiveMatch.next(this.currentLiveMatch.value);
        return response.userGamecard;
      }))
  }
  /*
    body:{"doublePoints", true} || {"doubleTime", true}
  */
  playSpecial(gamecardId:string, body:any){
    const endpoint = `${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${this.currentContestId}/match/${this.currentMatchId}/gamecard/${gamecardId}`;
    return this.http.put<any>(endpoint, body)
            .pipe(map(response => {
              if(!response.error){
                // Assign new data from the response to the LiveMatch Observable in order to let all listeners receive the new info
                Object.assign(this.currentLiveMatch.value.playedCards[
                  this.currentLiveMatch.value.playedCards.findIndex(el => el.id === response.userGamecard._id)], response.userGamecard)
                  this.currentLiveMatch.next(this.currentLiveMatch.value);
              }

              return response;
            }))
  }

}
