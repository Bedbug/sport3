import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Contest } from '../models/contest';
import { Observable, empty, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GrandPrize } from '../models/grand-prize';
import { ContestMatch } from '../models/contest-match';
import { Match } from '../models/match';

@Injectable({
  providedIn: 'root'
})
export class SportimoApiService {

    private cachedContests: BehaviorSubject<Contest[]>;

  constructor(private http: HttpClient, private Config: ConfigService) {
    this.cachedContests = new BehaviorSubject<Contest[]>(null);
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
    .pipe(map(contests=>{
      this.cachedContests.next(contests);
      return contests;
    }));
    // 
  }

  // Quick Info does not to be fresh
  getContestQuickDetails(contestId: string): Observable<Contest> {
    
    if (this.cachedContests.value){
      return this.cachedContests.pipe(map(contests => contests.find(x => x._id == contestId)));
    }else{
      // In case we load a contest page directly
      return this.getContests().pipe(map(contests => contests.find(x => x._id == contestId)));
    }
      
  }

  /*-----------------------------------------------------------------------------------
    Matches
  ----------------------------------------------------------------------------------- */
  getPresentMatches(contestId: string){
    return this.http.get<ContestMatch[]>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${contestId}/matches/present`)
    .pipe(map(matches=>{
      return matches;
    }));
  }

  getPastMatches(contestId: string){
    return this.http.get<ContestMatch[]>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${contestId}/matches/past`)
    .pipe(map(matches=>{
      return matches;
    }));
  }

  getMatchDataForUser(contestId:string, contestMatchId:string){
    return this.http.get<any>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${contestId}/match/${contestMatchId}/user`)
    .pipe(map(match=>{
      return match;
    }));
  }

}
