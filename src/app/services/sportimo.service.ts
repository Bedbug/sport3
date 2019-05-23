import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Contest } from '../models/contest';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { GrandPrize } from '../models/grand-prize';
import { ContestMatch } from '../models/contest-match';
import { LiveMatch } from '../models/live-match';
import { AuthenticationService } from './authentication.service';
// import { Socket } from 'ngx-socket-io';
import * as io from 'socket.io-client';

import demo from 'src/assets/json/demo.json';


// @Injectable()
// export class developmentSocket extends Socket {

//     constructor() {
//         super({ url: 'wss://sportimo-sockets-dev.herokuapp.com/', options: {} });
//     }

// }

// @Injectable()
// export class productionSocket extends Socket {

//     constructor() {
//         super({ url: 'wss://sportimo-sockets-prod.herokuapp.com/', options: {} });
//     }

// }

@Injectable({
  providedIn: 'root'
})
export class SportimoService {
  

  private cachedContests: BehaviorSubject<Contest[]>;
  private currentLiveMatch: BehaviorSubject<LiveMatch>;

  private currentMatchId;
  private currentContestId;

  private socket;

  constructor(
    private http: HttpClient,
    private Config: ConfigService,
    private authenticationService: AuthenticationService,
    // private devSocket: developmentSocket,
    // private socket: Socket
  ) {
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

  get currentMatch() {
    return this.currentLiveMatch.getValue();
    // if (this.currentLiveMatch.value)
    //   return this.currentLiveMatch.value;
    // else
    //   return this.getMatchDataForUser(contestId, contestMatchId);
  }

  getCurrentLiveMatchData(){
    return this.currentLiveMatch;
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
      .pipe(map(response => {
        this.currentLiveMatch.getValue().playedCards.push(response.userGamecard);
        this.currentLiveMatch.next(this.currentLiveMatch.value);
        return response.userGamecard;
      }))
  }
  /*
    body:{"doublePoints", true} || {"doubleTime", true}
  */
  playSpecial(gamecardId: string, body: any) {
    const endpoint = `${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${this.currentContestId}/match/${this.currentMatchId}/gamecard/${gamecardId}`;
    return this.http.put<any>(endpoint, body)
      .pipe(map(response => {
        if (!response.error) {
          // Assign new data from the response to the LiveMatch Observable in order to let all listeners receive the new info
          Object.assign(this.currentLiveMatch.value.playedCards[
            this.currentLiveMatch.value.playedCards.findIndex(el => el.id === response.userGamecard._id)], response.userGamecard)
          this.currentLiveMatch.next(this.currentLiveMatch.value);
        }

        return response;
      }))
  }

  /*-----------------------------------------------------------------------------------
   SOCKETS
 ----------------------------------------------------------------------------------- */
  getStream() {

    // console.log(demo.length);

    let observable = new Observable(observer => {
      this.socket = io(this.Config.getApi('SOCKET'));
      this.socket.on('message', (data) => {
        observer.next(data);
        this.parseSocket(data);
      });

      this.socket.on('welcome', (data) => {
        console.log(data);
        this.registerUserToStream();
      })

      this.socket.on('registered', (data) => {
        console.log(data);
        this.subscribeToMatchStream();
      });

      return () => {
        this.socket.disconnect();
      };
    })


    return observable;
  }

  parseSocket(data: any) {
    if (!data) return;
    if (data.type == "Event_added") {
      this.addTimelineEvent(data);
    } else if (data.type == "Event_updated") {
      this.updateTimelineEvent(data);
    } else if (data.type == "Stats_changed") {
      this.parseStatsEvent(data);
    }else if(data.type == "Advance_Segment"){
      this.advanceTimelineSegment(data);
    }else if(data.type == "Match_Reload"){
      this.reloadMatch(data);
    }else if(data.type == "Card_resumed" || data.type == "Card_lost" || data.type == "Card_won" || data.type == "Card_PresetInstant_activated"){
      this.updateCardStatus(data);
    }else if(data.type == "Match_full_time"){
      this.finalizeMatch(data);
    }
  }

  finalizeMatch(data: any) {
    console.log("[SPORTIMO SERVICE]: Current match finalized");
    
  }
  updateCardStatus(data: any) {
    throw new Error("Method not implemented.");
  }
  reloadMatch(data: any) {
    console.log("[SPORTIMO SERVICE]: Reloading match");
    this.http.get<LiveMatch>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${this.currentContestId}/match/${this.currentMatchId}/user`)
      .pipe(map(match => {
        this.currentLiveMatch.next(match);
        return match;
      }));
  }
  advanceTimelineSegment(data: any) {
    console.log(data.data.segment);
    if(data.data.segment.timed)
    console.log("[SPORTIMO SERVICE][TIMER]: We START counting match time");
    // this.currentMatchTimer.subscribe();
    else
    console.log("[SPORTIMO SERVICE][TIMER]: We END counting match time");
    // this.currentMatchTimer.unsubscibe();

    this.currentMatch.matchData.state++;
    this.currentMatch.matchData.timeline.push(data.data.segment);
    this.currentLiveMatch.next(this.currentMatch);
    console.log("[SPORTIMO SERVICE]: Addvanced Match state to: "+this.currentMatch.matchData.state);
  }
  updateTimelineEvent(data: any) {
    for (let section of this.currentLiveMatch.getValue().matchData.timeline){
      for (let event of section.events){        
        if(event._id == data.data._id){
          Object.assign(event,data.data);
        }
      }
    }
    this.currentLiveMatch.next(this.currentLiveMatch.value);
  }
  addTimelineEvent(data: any) {
    if (this.currentLiveMatch.getValue().matchData.timeline.length == 0)
      this.currentLiveMatch.getValue().matchData.timeline.push({ events: [] });
    // console.log(this.currentLiveMatch.getValue().matchData.timeline);
    this.currentLiveMatch.getValue().matchData.timeline[this.currentLiveMatch.getValue().matchData.timeline.length - 1].events.push(data.data);
    
    // if(data.type == "Goal"){
    //   this.currentLiveMatch.getValue().matchData.stats.find()
    // }

    this.currentLiveMatch.next(this.currentLiveMatch.value);
  }
  parseStatsEvent(data: any) {

    // This should change to a room <> current_match_id check
    let matchstats = data.data.find(x=>{
      return x.id == data.room;
    });
    
    if(matchstats.Minute){
     this.currentMatch.matchData.time = matchstats.Minute;
    }
    this.currentMatch.matchData.stats = data.data;
    this.currentLiveMatch.next(this.currentMatch);
  }

  playDemo() {
    // console.log(" --------- Initiating Demo");
    let index = 0;
    
    return timer(7000, 500).pipe(
      take(demo.length)).subscribe(x => {
        this.parseSocket(demo[x]);
      })

      // return timer(5000, 1500).pipe(
      //   take(1)).subscribe(x => {
      //     // if(demo[x].type == "Event_added")
      //     // console.log(index,demo[x].type);
      //     // index++;
      //     // let demoEvent = demo.data.find(x=>x.type =='Substitution');
      //     // console.log(demoEvent);
      //     this.parseSocket(demo[133]);
      //     // this.parseSocket(demo[x]);
      //   })
  }

  registerUserToStream() {
    this.socket.emit('register', {
      uid: this.authenticationService.currentUserValue._id,
      uname: this.authenticationService.currentUserValue.name,
      admin: false
    })
  }

  subscribeToMatchStream() {
    this.socket.emit('subscribe', { room: this.currentMatchId });
  }

  clearMatch() {
    this.currentLiveMatch.next(null);
  }
}