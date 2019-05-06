import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Contest } from '../models/contest';
import { Observable, empty } from 'rxjs';
import { map } from 'rxjs/operators';
import { GrandPrize } from '../models/grand-prize';

@Injectable({
  providedIn: 'root'
})
export class SportimoApiService {

  cachedContests: Observable<Contest[]>;

  constructor(private http: HttpClient, private Config: ConfigService) {
  }

  getGrandPrize() {
    return this.http.get<GrandPrize>(`${this.Config.getApi("GRAND_PRIZE")}/${this.Config.getClient()}`);
  }

  // Always returns a fresh list
  getContests() {

    this.cachedContests = this.http.get<Contest[]>(`${this.Config.getApi("CONTESTS")}/${this.Config.getClient()}`);
    return this.cachedContests;
  }

  // Quick Info does not to be fresh
  getContestQuickDetails(contestId: string): Observable<Contest> {
    
    if (this.cachedContests){
      return this.cachedContests.pipe(map(contests => contests.find(x => x.id == contestId)));
    }else{
      // In case we load a contest page directly
      return this.getContests().pipe(map(contests => contests.find(x => x.id == contestId)));
    }
      
  }


}
