import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Contest } from '../models/contest';
import { Observable, BehaviorSubject, timer, of, Subject, EMPTY } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { GrandPrize } from '../models/grand-prize';
import { ContestMatch } from '../models/contest-match';
import { LiveMatch } from '../models/live-match';
import { AuthenticationService } from './authentication.service';
// import { Socket } from 'ngx-socket-io';
import { io } from 'socket.io-client';
import { ErrorDisplayService } from './error-display.service';

// import demo from 'src/assets/json/demo.json';


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

  private defaultConfiguration = {
    appName: { "en": "Sportimo", "ar": "", "fa": "" },
    availableLanguages: ["ar", "en", "ru"],
    defaultLanguage: "en",
    displayNews: true,
    theme: "beeline",
    showTeamStats: false
  }

  public currentLiveMatch: BehaviorSubject<LiveMatch>;
  public cachedContests: BehaviorSubject<Contest[]>;
  private grandPrizes: BehaviorSubject<GrandPrize[]>;
  private currentMatchId;
  private currentContestId;
  public configuration: BehaviorSubject<any>;

  // Used to update header point when user is in match
  public contestPointsUpdate = new Subject<number>();
  public contestPointsSet = new Subject<number>();

  private socket;
  langIsRTL: boolean = false;
  matchReloading: boolean;
  UTMParams: any;



  constructor(
    private http: HttpClient,
    private Config: ConfigService,
    private authenticationService: AuthenticationService,
    private errorDisplay: ErrorDisplayService,
    // private devSocket: developmentSocket,
    // private socket: Socket
  ) {
    this.cachedContests = new BehaviorSubject<Contest[]>([]);
    this.currentLiveMatch = new BehaviorSubject<LiveMatch>(null);
    this.grandPrizes = new BehaviorSubject<GrandPrize[]>(null);
    this.configuration = new BehaviorSubject<any>(this.defaultConfiguration);
  }

  /*-----------------------------------------------------------------------------------
    For Demo purposes ONLY
  ----------------------------------------------------------------------------------- */
  startDemo() {
    return this.http.post<any>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${this.currentContestId}/match/${this.currentMatchId}/start`, {})
      .pipe(map(response => {
        return response;
      }))
  }

  /*-----------------------------------------------------------------------------------
   Client Configuration
 ----------------------------------------------------------------------------------- */
  getClientConfiguration() {
    // if (this.configuration.value)
    //   return this.configuration;
    // else {
    return this.http.get<any>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}`).pipe(map(data => {
      // console.log("Configuration loaded");
      this.configuration.next(data);
      return data;
    }));
  }
  // }

  getConfigurationFor(key: string | number) {
    // console.log(key); 
    // console.log(this.configuration);
    if (!this.configuration.value)
      return null;

    return this.configuration.value[key];
  }

  /*-----------------------------------------------------------------------------------
     Push Notifications
   ----------------------------------------------------------------------------------- */
  addPushSubscriber(sub: any) {
    const postData = sub;
    return this.http.post<any>(`${this.Config.getApi("ROOT")}/users/push`, postData)
      .pipe(map(result => {
        return result;
      }))
  }

  /*-----------------------------------------------------------------------------------
    Terms
  ----------------------------------------------------------------------------------- */
  getClientTerms() {
    let api = '/data/client/' + this.Config.getClient() + '/terms-conditions/';
    return this.http.get<any>(`${this.Config.getApi("ROOT")}${api}`);
  }

  /*-----------------------------------------------------------------------------------
    Winners
  ----------------------------------------------------------------------------------- */
  getWinners() {
    let winnersApi = '/data/client/' + this.Config.getClient() + '/winners/';
    return this.http.get<any>(`${this.Config.getApi("ROOT")}${winnersApi}`);
  }

  /*-----------------------------------------------------------------------------------
    Home Matches
  ----------------------------------------------------------------------------------- */

  getHomeMatches() {
    // http://localhost:3030/client-api/v1/data/client/5be2bfc7135a3e1e2d4a637f/top-picks/matches/upcoming
    return this.http.get<any[]>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/matches/front-page`);
  }

  getFAQs() {
    return this.http.get<any[]>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/faq`);
  }

  /*-----------------------------------------------------------------------------------
    Grand Prize
  ----------------------------------------------------------------------------------- */
  getGrandPrizes() {
    if (this.grandPrizes.value) {
      return this.grandPrizes;
    } else {
      // In case we load a contest page directly
      return this.http.get<GrandPrize[]>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/grand-prizes/`).pipe(map(prizes => {
        this.grandPrizes.next(prizes);
        return prizes;
      })
      );
    }
  }

  getGrandPrizeUserChances(prizeId: string) {
    return this.http.get<any>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/grand-prize/${prizeId}/chances`);
  }

  /*-----------------------------------------------------------------------------------
   Top Picks
 ----------------------------------------------------------------------------------- */
  getYesterdayGames() {
    // http://localhost:3030/client-api/v1/data/client/5be2bfc7135a3e1e2d4a637f/top-picks/matches/past
    return this.http.get<any[]>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/top-picks/matches/past`);
  }

  getTopScorers() {
    // http://localhost:3030/client-api/v1/data/client/5be2bfc7135a3e1e2d4a637f/top-picks/scorers
    return this.http.get<any[]>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/top-picks/scorers`);
  }

  getUpcoming() {
    // http://localhost:3030/client-api/v1/data/client/5be2bfc7135a3e1e2d4a637f/top-picks/matches/upcoming
    return this.http.get<any[]>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/top-picks/matches/upcoming`);
  }

  /*-----------------------------------------------------------------------------------
    News
  ----------------------------------------------------------------------------------- */
  getNews() {
    return this.http.get<any>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/articles`);
  }
  getMoreNews(lastArticleID: string) {
    return this.http.get<any>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/articles?skip=${lastArticleID}`);
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

  // Quick Info does not need to be fresh
  getContestQuickDetails(contestId: string): Observable<Contest> {
    if (this.cachedContests.value) {
      return this.cachedContests.pipe(map(contests => contests.find(x => x._id == contestId)));
    } else {
      // In case we load a contest page directly
      console.log("DEBUG: Requesting direct contest Quick details");
      return this.getContests().pipe(map(contests => contests.find(x => x._id == contestId)));
    }
  }

  getContestDetails(contestId: string) {
    if (!this.authenticationService.currentUserValue) {
      return this.getContestQuickDetails(contestId);
    } else {
      return this.http.get<Contest>(
        `${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${contestId}`)
        .pipe(map(contest => {
          // console.log("DEBUG: Requesting direct contest details");
          contest.isUserDetails = true;
          this.updateCachedContests(contest);
          return contest;
        }));
    }
  }

  updateCachedContests(contest: Contest) {

    const i = this.cachedContests.value.findIndex(_item => _item._id === contest._id);
    if (i > -1) this.cachedContests.value[i] = contest; // (2)
    else this.cachedContests.value.push(contest);
    this.cachedContests.next(this.cachedContests.value);
  }

  getContestPrizes(contestId: string) {
    return this.http.get<any>(
      `${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${contestId}/prizes`)
      .pipe(map(prizes => {
        return prizes;
      }));
  }

  joinContest(contestId: string) {
    return this.http.post<any>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${contestId}`, null)
      .pipe(map(result => {
        this.cachedContests.value.find(x => x._id == contestId).isSubscribed = true;
        this.cachedContests.next(this.cachedContests.value);
        return result;
      }))
  }

  joinMatch(contestId: string, matchId: string) {
    // POST /client-api/v1/data/client/:clientId/tournament/:tournamentId/match/:matchId
    return this.http.post<any>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${contestId}/match/${matchId}`, null)
      .pipe(map(result => {
        // this.cachedContests.value.find(x => x._id == contestId).isSubscribed = true;
        // this.cachedContests.next(this.cachedContests.value);
        return result;
      }))
  }

  /*-----------------------------------------------------------------------------------
   LEADERBOARDS
 ----------------------------------------------------------------------------------- */
  getContestLeaders(contestId: string) {
    return this.http.get<any>(
      // Get The end point
      // http://localhost:3030/v1/data/client/5be2bfc7135a3e1e2d4a637f/tournament/5be2f82c135a3e1e2d4a6380/leaders
      `${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${contestId}/leaders`)
      .pipe(map(leaders => {
        return leaders;
      }));
  }

  getContestMatchLeaders(contestId: string, matchId: string) {
    return this.http.get<any>(
      // http://localhost:3030/v1/data/client/5be2bfc7135a3e1e2d4a637f/tournament/5be2f82c135a3e1e2d4a6380/match/5be2fc12135a3e1e2d4a6381/leaders
      `${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${contestId}/match/${matchId}/leaders`)
      .pipe(map(leaders => {
        return leaders;
      }));
  }

  getPrizeLeaders(prizeId: string) {
    return this.http.get<any>(
      // Get The end point
      // http://localhost:3032/client-api/v1/data/client/:clientId/grand-prize/:grandPrizeId/leaders
      `${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/grand-prize/${prizeId}/leaders`)
      .pipe(map(leaders => {
        return leaders;
      }));
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

  getCurrentLiveMatchData() {
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
    console.log(this.currentLiveMatch.value.matchData.state);

    return this.http.post<any>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${this.currentContestId}/match/${this.currentMatchId}/gamecards`, cardSelections)
      .pipe(map(response => {
        if (!response.error) {
          this.currentLiveMatch.getValue().playedCards.push(response.userGamecard);
          this.currentLiveMatch.next(this.currentLiveMatch.value);
          return response.userGamecard;
        }
        else
          return null;

      }))
  }
  /*
    body:{"doublePoints", true} || {"doubleTime", true}
  */
  playSpecial(gamecardId: string, body: any) {

    var doublePointsUsed = this.currentLiveMatch.value.playedCards.filter(x => x.isDoublePoints).length;
    var doubleTimeUsed = this.currentLiveMatch.value.playedCards.filter(x => x.isDoubleTime).length;
    var specialsUsed = doublePointsUsed + doubleTimeUsed;
    var maxSpecials = this.currentLiveMatch.value.matchData.settings.gameCards.specials
    console.log(maxSpecials - specialsUsed);

    if (maxSpecials - specialsUsed <= 0) {
      this.errorDisplay.showError("10007");
      return EMPTY;
    }

    const endpoint = `${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${this.currentContestId}/match/${this.currentMatchId}/gamecard/${gamecardId}`;
    return this.http.put<any>(endpoint, body)
      .pipe(map(response => {
        if (!response.error) {
          console.log(response);

          // Assign new data from the response to the LiveMatch Observable in order to let all listeners receive the new info
          Object.assign(this.currentLiveMatch.value.playedCards[
            this.currentLiveMatch.value.playedCards.findIndex(el => el.id === response.userGamecard._id)], response.userGamecard)
          this.currentLiveMatch.next(this.currentLiveMatch.value);
        }

        return response;
      }))
  }

  getMatchScore() {
    if (this.currentLiveMatch.value) {
      return (this.currentLiveMatch.value.playedCards.filter(x => x.pointsAwarded).map(item => item.pointsAwarded).reduce((prev, curr) =>
        prev + curr, 0))
    } else
      return 0;
  }

  /*-----------------------------------------------------------------------------------
     METRICS
   ----------------------------------------------------------------------------------- */
  private sequenceId: string;
  private correlatorId: string;

  onboardingMetricsStart(sequenceId: string) {
    const postData = { client: this.Config.getClient(), sequence: sequenceId };

    return this.http.post<any>(`${this.Config.getApi("ROOT")}/users/onboarding/start`, postData)
      .pipe(map(result => {
        this.correlatorId = result.correlator;
        this.sequenceId = sequenceId;
        return result;
      }))
  }

  onboardingMetricsStop(msisdn: string) {
    const postData = {
      client: this.Config.getClient(),
      sequence: this.sequenceId,
      correlator: this.correlatorId,
      msisdn: msisdn
    };
    return this.http.post<any>(`${this.Config.getApi("ROOT")}/users/onboarding/stop`, postData)
      .pipe(map(result => {
        return result;
      }))
  }

  /*-----------------------------------------------------------------------------------
   SOCKETS
 ----------------------------------------------------------------------------------- */
  getStream() {
    let observable = new Observable(observer => {
      // console.log(this.Config.getApi('SOCKET'));

      this.socket = io(this.Config.getApi('SOCKET'), { transports: ['websocket', 'polling'] });
      // this.socket = io("localhost:3031", { transports: ['websocket', 'polling'] });

      // on reconnection, reset the transports option, as the Websocket
      // connection may have failed (caused by proxy, firewall, browser, ...)
      this.socket.on('reconnect_attempt', () => {
        console.log("[Sockets] Reconnect Attempt");
        this.socket.io.opts.transports = ['polling', 'websocket'];
      });

      this.socket.on('message', (data) => {
        // console.log("Sockets: Message: ");
        // console.log(data);

        observer.next(data);
        this.parseSocket(data);
      });

      this.socket.on('welcome', (data) => {
        console.log("[Sockets] Welcome");
        this.registerUserToStream();
      })

      this.socket.on('registered', (data) => {
        // console.log("Sockets: Match Registered");
        this.subscribeToMatchStream();
      });

      // let data = { "type": "Card_won", "client": "5d7389fbd6126dd7ffe3df9d", "room": "5e55256283019a001f4f1288", "data": { "id": "5e5525bbb9c5eb0004f86a4d", "userid": "5d7389fbd6126dd7ffe3df9d", "matchid": "5e55256283019a001f4f1288", "gamecardDefinitionId": "5e55256383019a001f4f12d1", "title": { "ar": "تسلل", "en": "Offside", "fa": "آفساید", "ru": "Офсайд" }, "image": { "url": "", "sprite": "offside", "en": "", "ar": "", "fa": "" }, "text": { "ar": "نعم اي فريق", "en": "Yes any team", "fa": "بله هر تیمی", "ru": "Любая команда" }, "minute": 1, "segment": 1, "primaryStatistic": "Offside", "cardType": "PresetInstant", "isDoubleTime": false, "isDoublePoints": false, "status": 2, "specials": { "DoublePoints": { "status": 0, "_id": "5e5525bbb9c5eb0004f86a4e", "activationLatency": 0 }, "DoubleTime": { "status": 0, "_id": "5e5525bbb9c5eb0004f86a4f", "activationLatency": 0 } }, "startPoints": 120, "endPoints": 60, "activationLatency": 20000, "pointsAwarded": 75, "duration": 600000, "optionId": "3", "creationTime": "2020-02-25T13:48:43.302Z", "activationTime": "2020-02-25T13:50:02.568Z", "terminationTime": "2020-02-25T14:00:02.568Z", "wonTime": "2020-02-25T13:57:27.992Z" }, "inst": 551 };
      // let data2 = {"type":"Card_lost","client":"5d7389fbd6126dd7ffe3df9d","room":"5e55256283019a001f4f1288","data":{"id":"5e5525c4b9c5eb0004f86a52","userid":"5d7389fbd6126dd7ffe3df9d","matchid":"5e55256283019a001f4f1288","gamecardDefinitionId":"5e55256383019a001f4f12cc","title":{"ar":"ضربة ركنية","en":"Corner","fa":"کرنر","ru":"Угловой"},"image":{"url":"","sprite":"corner","en":"","ar":"","fa":""},"text":{"ar":"لا","en":"No corner","fa":"","ru":"Не будет углового"},"minute":1,"segment":1,"primaryStatistic":"Corner","cardType":"PresetInstant","isDoubleTime":false,"isDoublePoints":false,"status":2,"specials":{"DoublePoints":{"status":0,"_id":"5e5525c4b9c5eb0004f86a53","activationLatency":0},"DoubleTime":{"status":0,"_id":"5e5525c4b9c5eb0004f86a54","activationLatency":0}},"startPoints":25,"endPoints":25,"activationLatency":20000,"duration":600000,"optionId":"4","creationTime":"2020-02-25T13:48:52.067Z","activationTime":"2020-02-25T13:50:02.568Z","terminationTime":"2020-02-25T14:00:02.568Z"},"inst":551};
      // let data3 = {"type":"Event_added","room":"5dbc4477c92cab0020eb4451","data":{"players":[{"id":"5d00bfbeb06f57411005e253","name":{"en":"Konstantinos Fortounis"}}],"linked_mods":[],"_id":"5e6f5d105cc63100174d63d6","match_id":"5dbc4477c92cab0020eb4451","type":"Corner","stats":{"Corner":1},"playerscount":1,"status":"active","timeline_event":true,"state":5,"sender":"Moderator","time":93,"team":"home_team","team_id":"5ced76ac16085858dce99af1","complete":false,"playerSelected":"","created":"2020-03-16T11:03:44.901Z"},"inst":440};
      // let data4 = {"type":"Advance_Segment","room":"5dbc4477c92cab0020eb4451","data":{"segment":{"start":"2020-03-16T11:01:04Z","sport_start_time":90,"timed":true,"text":{"en":"Overtime First Half","ar":"الشوط الإضافي الأول"},"break_time":0,"events":[]},"match_id":"5dbc4477c92cab0020eb4451","info":"The porperty segment should be pushed to the timeline","sportSegmenInfo":{"name":{"en":"Overtime First Half","ar":"الشوط الإضافي الأول"},"timed":true,"initialTime":90},"state":5,"timeline_event":false},"inst":440}
      // setTimeout(() => {
      //   console.log("Firing test Event");

      //   observer.next(data3)
      // },5000)
      // setTimeout(() => {
      //   console.log("Firing test Event");

      //   observer.next(data2)
      // },4000)
      // setTimeout(() => {
      //   console.log("Firing test Event");

      //   observer.next(data4)
      // },6000)


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
    } else if (data.type == "Advance_Segment") {
      this.advanceTimelineSegment(data);
    } else if (data.type == "Match_Reload") {
      this.reloadMatch(data);
    } else if (data.type == "Card_paused" || data.type == "Card_resumed" || data.type == "Card_Special_activated" || data.type == "Card_lost" || data.type == "Card_won" || data.type == "Card_PresetInstant_activated") {
      this.updateCardStatus(data);
    } else if (data.type == "Match_full_time") {
      this.finalizeMatch(data);
    } else if (data.type == "Bet_State") {
      this.setBetState(data.data);
    }
  }

  setBetState(data: any) {
    this.currentLiveMatch.value.matchData.noBet = data.noBet;
    this.currentLiveMatch.next(this.currentLiveMatch.value);
    console.log("[SPORTIMO SERVICE]: Current match Bet State set to:" + !this.currentLiveMatch.value.matchData.noBet);
  }

  finalizeMatch(data: any) {
    console.log("[SPORTIMO SERVICE]: Current match finalized");

  }
  updateCardStatus(data: any) {
    // console.log(data);
    Object.assign(this.currentLiveMatch.value.playedCards[
      this.currentLiveMatch.value.playedCards.findIndex(el => el.id === data.data.id)], data.data)
    this.currentLiveMatch.next(this.currentLiveMatch.value);

    if (data.type == "Card_won")
      this.contestPointsUpdate.next(data.data.pointsAwarded);
  }


  // getMatchDataForUser(contestId: string, contestMatchId: string) {
  //   this.currentContestId = contestId;
  //   this.currentMatchId = contestMatchId;
  //   return this.http.get<LiveMatch>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${contestId}/match/${contestMatchId}/user`)
  //     .pipe(map(match => {
  //       this.currentLiveMatch.next(match);
  //       return match;
  //     }));
  // }

  reloadMatch(data: any) {

    if (this.currentLiveMatch.value.matchData.completed)
      return;
    console.log("[SPORTIMO SERVICE]: Reloading match");
    this.matchReloading = true;
    this.http.get<LiveMatch>(`${this.Config.getApi("ROOT")}/data/client/${this.Config.getClient()}/tournament/${this.currentContestId}/match/${this.currentMatchId}/user`)
      .pipe(map(match => {
        this.currentLiveMatch.next(match);
        this.matchReloading = false;
        return match;
      })).subscribe();

    this.getContestDetails(this.currentContestId).subscribe(details => {
      this.contestPointsSet.next(details.user_chances);
    })
  }

  advanceTimelineSegment(data: any) {
    if (data.data.segment.timed)
      console.log("[SPORTIMO SERVICE][TIMER]: We START counting match time");
    // this.currentMatchTimer.subscribe();
    else
      console.log("[SPORTIMO SERVICE][TIMER]: We END counting match time");
    // this.currentMatchTimer.unsubscibe();

    this.currentMatch.matchData.state++;
    this.currentMatch.matchData.timeline.push(data.data.segment);
    this.currentMatch.matchData.time = data.data.segment.sport_start_time;
    this.currentLiveMatch.next(this.currentMatch);
    console.log("[SPORTIMO SERVICE]: Addvanced Match state to: " + this.currentMatch.matchData.state);
  }
  updateTimelineEvent(data: any) {
    for (let section of this.currentLiveMatch.getValue().matchData.timeline) {
      for (let event of section.events) {
        if (event._id == data.data._id) {
          Object.assign(event, data.data);
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
    let matchstats = data.data.find(x => {
      return x.id == data.room;
    });

    if (matchstats.Minute) {
      this.currentMatch.matchData.time = matchstats.Minute;
    }
    this.currentMatch.matchData.stats = data.data;
    this.currentLiveMatch.next(this.currentMatch);
  }

  playDemo() {
    // console.log(" --------- Initiating Demo");
    let index = 0;

    // return timer(7000, 500).pipe(
    //   take(demo.length)).subscribe(x => {
    //     this.parseSocket(demo[x]);
    //   })

    // return timer(5000, 1500).pipe(
    //   take(1)).subscribe(x => {
    //     // if(demo[x].type == "Event_added")
    //     // index++;
    //     // let demoEvent = demo.data.find(x=>x.type =='Substitution');
    //     this.parseSocket(demo[133]);
    //     // this.parseSocket(demo[x]);
    //   })
  }

  registerUserToStream() {
    // console.log("Sockets: Requesting registration to stream");
    this.socket.emit('register', {
      uid: this.authenticationService.currentUserValue._id,
      uname: this.authenticationService.currentUserValue.username,
      admin: false
    })
  }

  subscribeToMatchStream() {
    // console.log("Sockets: Requesting subsription to match");
    this.socket.emit('subscribe', { room: this.currentLiveMatch.value.matchData._id });
  }

  clearMatch() {
    this.currentLiveMatch.next(null);
  }



  /*-----------------------------------------------------------------------------------
     Standings / Teams / Players
   ----------------------------------------------------------------------------------- */
  getStandingsLeagues() {
    return this.http.get<any>(`${this.Config.getApi("ROOT")}/data/standings?status=Active`);
    // return this.http.get<any>('./assets/json/standings-leagues.json');
    // /client-api/v1/data/competition-seasons?status=Active
  }
  getStandings(leagueId: string) {
    return this.http.get<any>(`${this.Config.getApi("ROOT")}/data/standings/${leagueId}`);
    // return this.http.get<any>(`https://sportimo-clientonly-server-dev.herokuapp.com/v1/data/standings/${leagueId}`);     

  }
  getPlayer(playerId: string) {
    // return this.http.get<any>(`${this.Config.getApi("ROOT")}/data/players/${playerId}`);  
    return this.http.get<any>(`https://sportimo-clientonly-server-dev.herokuapp.com/v1/data/players/${playerId}`);
  }
  getTeam(teamId: string) {
    return this.http.get<any>(`${this.Config.getApi("ROOT")}/data/teams/${teamId}/full`);
    // return this.http.get<any>(`https://sportimo-clientonly-server-dev.herokuapp.com/v1/data/teams/${teamId}/full`);
    // return this.http.get<any>(`https://sportimo-clientonly-server-dev.herokuapp.com/v1/data/teams/588a8d890bb50f00feda8dc0/full`);    
  }

  /*-----------------------------------------------------------------------------------
     Achievements
   ----------------------------------------------------------------------------------- */
  getAchievements() {
    if (this.authenticationService.currentUserValue)
      return this.http.get<any>(`${this.Config.getApi("ROOT")}/users/${this.authenticationService.currentUserValue._id}/stats`);
    else return of(null);
    // return this.http.get<any>(`https://sportimo-clientonly-server-dev.herokuapp.com/v1/users/${this.authenticationService.currentUserValue._id}/stats`);
  }

  /*-----------------------------------------------------------------------------------
     Favorites
   ----------------------------------------------------------------------------------- */
  getFavoriteTeamData(teamId: string, competitionId: string) {
    return this.http.get<any>(`${this.Config.getApi("ROOT")}/data/teams/${teamId}/favorite/competition/${competitionId}`);
    // return this.http.get<any>(`https://sportimo-clientonly-server-dev.herokuapp.com/v1/data/teams/${teamId}/favorite`);
  }

  /*-----------------------------------------------------------------------------------
     Inbox
   ----------------------------------------------------------------------------------- */
  getMessages() {
    return this.http.get<any>(`${this.Config.getApi("ROOT")}/users/${this.authenticationService.currentUserValue._id}/messages`);
  }

  deleteMessage(messageId: string) {
    return this.http.delete<any>(`${this.Config.getApi("ROOT")}/users/${this.authenticationService.currentUserValue._id}/messages/${messageId}`);
  }

  /*-----------------------------------------------------------------------------------
     On Demand
   ----------------------------------------------------------------------------------- */
  buyProduct(defaultProduct: any) {
    const postData = {
      productId: defaultProduct._id
    };
    return this.http.post<any>(`${this.Config.getApi("ROOT")}/data/purchase`, postData)
      .pipe(map(result => {
        return result;
      }))
  }

  /*-----------------------------------------------------------------------------------
     UTM Params
   ----------------------------------------------------------------------------------- */
  setUTMParams(utm_campaign: string, utm_source: string, utm_medium: string, utm_term: string, utm_content: string, utm_id: string) {
    this.UTMParams = {
      utm_campaign: utm_campaign,
      utm_source: utm_source,
      utm_medium: utm_medium,
      utm_term: utm_term,
      utm_content: utm_content,
      utm_id: utm_id,
    }
  }

  sendUTMParams(msisdn: string) {
    let postData = {
      msisdn: msisdn.toString(),
      client: this.Config.getClient(),
      utm_campaign: this.UTMParams.utm_campaign,
      utm_source: this.UTMParams.utm_source,
      utm_medium: this.UTMParams.utm_medium,
      utm_term: this.UTMParams.utm_term,
      utm_content: this.UTMParams.utm_content,
      utm_id: this.UTMParams.utm_id,

    }
    return this.http.post<any>(`${this.Config.getApi("ROOT")}/users/blaise/utm-notify`, postData)
      .pipe(map(response => {
        return response;
      }));
  }

}
