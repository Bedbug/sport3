import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, interval, observable } from 'rxjs';
import { map, timeout } from 'rxjs/operators';

import { User } from '../models/user';
import { ConfigService } from './config.service';
import { Team } from '../models/team';
import moment from 'moment-mini';
import { EvinaService } from './evina.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    lo: any;
    curren: any;

    constructor(private http: HttpClient, private Config: ConfigService, private evinaService:EvinaService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();


        // Always sign in when loading
        if (this.currentUserValue && this.currentUserValue.token) {
            let that = this;
            this.Config.inited.subscribe(hasInited => {
                // if(!hasInited)
                // console.log("Not Yet");

                if (hasInited) {
                    that.singleSignOn().subscribe()
                }

            })
            // setTimeout(function () { that.singleSignOn().subscribe() },5000);
        }
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    singleSignOn() {
        return this.http.post<any>(`${this.Config.getApi("ROOT")}/users/single_signon`, null)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // console.log("SingleSign: " + user.loyaltyCoins);

                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ _id: user._id, token: user.token }));
                    this.currentUserSubject.next(user);
                }
            }));
    }

    login(username: string, password: string) {
        // return of(null);
        return this.http.post<any>(`${this.Config.getApi("ROOT")}/users/authenticate`, { username, password })
            // return this.http.post<any>(`https://clientserver-3.herokuapp.com/v1/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ _id: user._id, token: user.token }));

                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }


    /*-----------------------------------------------------------------------------------
      User registration
    ----------------------------------------------------------------------------------- */

    blaiseSignin(msisdn: string, operatorCode: string, lang: string, path: string, tpaySession: string = null) {
        // console.log(tpaySession);
        
        let postData = {
            msisdn: msisdn.toString(),
            client: this.Config.getClient(),
            operatorCode: operatorCode,
            path: path,
            language: lang,
            tpaySessionId:tpaySession
        }
        return this.http.post<any>(`${this.Config.getApi("ROOT")}/users/blaise/signin`, postData)
            .pipe(map(response => {
                // Save the signin data for future use
                if (response != null && response.success)
                    localStorage.setItem('signon', JSON.stringify({ msisdn: postData.msisdn, client: postData.client }));

                // if (response.user && response.user.token) {
                //     // store user details and jwt token in local storage to keep user logged in between page refreshes
                //     localStorage.setItem('currentUser', JSON.stringify({ _id: response.user._id, token: response.user.token }));
                //     this.currentUserSubject.next(response.user);
                // }
                return response;
            }));
    }

    ulinkVerify(msisdnCode: string, lang: string) {
        let postData = {
            msisdnCode: msisdnCode,
            client: this.Config.getClient(),
            language: lang
        }
        return this.http.post<any>(`${this.Config.getApi("ROOT")}/users/blaise/ulink-signin`, postData)
            .pipe(map(response => {
                // Save the signin data for future use
                if (response != null && response.success) {
                    localStorage.setItem('signon', JSON.stringify({ msisdn: response.msisdn, client: postData.client }));
                    if (response.user && response.user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify({ _id: response.user._id, token: response.user.token }));
                        this.currentUserSubject.next(response.user);
                    }
                }

                return response;
            }));
    }

    redirectSignin(msisdn: string, lang: string) {
        let postData = {
            msisdn: msisdn,
            client: this.Config.getClient(),
            language: lang
        }
        return this.http.post<any>(`${this.Config.getApi("ROOT")}/users/blaise/redirect-signin`, postData)
            .pipe(map(response => {
                // Save the signin data for future use
                if (response != null && response.success) {
                    localStorage.setItem('signon', JSON.stringify({ msisdn: response.msisdn, client: postData.client }));
                    if (response.user && response.user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify({ _id: response.user._id, token: response.user.token }));
                        this.currentUserSubject.next(response.user);
                    }
                }

                return response;
            }));
    }

    ulinkSend(msisdn: string, lang: string) {
        let postData = {
            msisdn: msisdn.toString(),
            client: this.Config.getClient(),
            language: lang
        }
        return this.http.post<any>(`${this.Config.getApi("ROOT")}/users/blaise/sendUlink`, postData)
            .pipe(map(response => {
                // Save the signin data for future use
                // if (response != null && response.success)
                //     localStorage.setItem('signon', JSON.stringify({ msisdn: postData.msisdn, client: postData.client }));

                // if (response.user && response.user.token) {
                //     // store user details and jwt token in local storage to keep user logged in between page refreshes
                //     localStorage.setItem('currentUser', JSON.stringify({ _id: response.user._id, token: response.user.token }));
                //     this.currentUserSubject.next(response.user);
                // }
                return response;
            }));
    }

    blaiseVerify(pin: string, noSubscription: boolean) {
        let postData = JSON.parse(localStorage.getItem('signon'));
        postData.pin = pin;
        postData.sSub = noSubscription;

        if(this.evinaService.transactionID)
            postData.transactionId = this.evinaService.transactionID;
        if(this.evinaService.timestamp)
            postData.timestamp = this.evinaService.timestamp;

        return this.http.post<any>(`${this.Config.getApi("ROOT")}/users/blaise/verify`, postData)
            .pipe(map(response => {
                // Save the signin data for future use
                if (response != null && response.success) {
                    localStorage.setItem('signon', JSON.stringify({ pin: pin, msisdn: postData.msisdn, client: postData.client }));
                    if (response.user && response.user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify({ _id: response.user._id, token: response.user.token }));
                        this.currentUserSubject.next(response.user);
                    }

                    this.evinaService.removeScript();
                }
                return response;
            }));
    }



    resendPin(lang: string) {
        let postData = JSON.parse(localStorage.getItem('signon'));

        postData.language = lang;

        return this.http.post<any>(`${this.Config.getApi("ROOT")}/users/blaise/pin-resend`, postData)
            .pipe(map(response => {
                // Save the signin data for future use
                // if (response != null && response.success) {
                //     localStorage.setItem('signon', JSON.stringify({ pin: pin, msisdn: postData.msisdn, client: postData.client }));
                //     if (response.user && response.user.token) {
                //         // store user details and jwt token in local storage to keep user logged in between page refreshes
                //         localStorage.setItem('currentUser', JSON.stringify({ _id: response.user._id, token: response.user.token }));
                //         this.currentUserSubject.next(response.user);
                //     }
                // }
                return response;
            }));
    }

    updateUsername(username: string) {
        let putData = {
            username: username
        };
        return this.http.put<any>(`${this.Config.getApi("ROOT")}/users/${this.currentUserSubject.value._id}`, putData)
            .pipe(map(response => {
                // Save the signin data for future use
                // console.log(response);
                if (response != null && response.success) {
                    this.currentUserSubject.value.username = username;
                    this.currentUserSubject.next(this.currentUserSubject.value);
                    // if (response.user && response.user.token) {
                    //     // store user details and jwt token in local storage to keep user logged in between page refreshes
                    //     // localStorage.setItem('currentUser', JSON.stringify({ _id: response.user._id, token: response.user.token }));                                                
                    //     // this.currentUserSubject.next(response.user);
                    // }
                }
                return response;
            }));
    }
    // "username": "blackHeretic",
    // "pushSettings": {
    //     "all": true,
    //     "new_message": true,
    //     "match_reminder": true,
    //     "kick_off": true,
    //     "goals": true,
    //     "won_cards": true,
    //     "final_result": true
    // },
    // "languagePreference": "ar"
    updateUserAll(username: string, PushSettings: any, lang: string) {
        let putData = {
            username: username,
            pushSettings: PushSettings,
            languagePreference: lang
        };
        return this.http.put<any>(`${this.Config.getApi("ROOT")}/users/${this.currentUserSubject.value._id}`, putData)
            .pipe(map(response => {
                // Save the signin data for future use
                // console.log(response);
                if (response != null && response.success) {
                    this.currentUserSubject.value.username = username;
                    this.currentUserSubject.next(this.currentUserSubject.value);
                }
                return response;
            }));
    }
    updateUserLang(lang: string) {
        let putData = {
            languagePreference: lang
        };

        if (this.currentUserSubject.value)
            return this.http.put<any>(`${this.Config.getApi("ROOT")}/users/${this.currentUserSubject.value._id}`, putData)
                .pipe(map(response => {
                    // Save the signin data for future use
                    // console.log(response);
                    if (response != null && response.success) {
                        this.currentUserSubject.next(this.currentUserSubject.value);
                    }
                    return response;
                }));

        return this.currentUserSubject;
    }

    registerMSISDN(msisdn: string) {
        return this.http.post<any>(`${this.Config.getApi("ROOT")}/users/msisdn`, { msisdn: msisdn })
            .pipe(map(response => {
                return response;
            }));
    }

    validatePIN(pin: string) {
        return this.http.post<any>(`${this.Config.getApi("ROOT")}/users/pin`, { pin: pin })
            .pipe(map(response => {
                return response;
            }));
    }

    registerUser(username: string, password: string) {
        return this.http.post<any>(`${this.Config.getApi("ROOT")}/users/register`, { username: username, password: password })
            .pipe(map(response => {
                return response;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('signon');
        this.currentUserSubject.next(null);
    }

    updateFavorites(team: Team, competition: any, remove: boolean) {
        let newTeamFavorites: any[] = this.currentUserSubject.value.favTeams;

        // console.log("Remove:" + remove);
        if (remove) {
            newTeamFavorites = newTeamFavorites.filter(favteam => {
                return favteam.team._id != team._id;//&& favteam.competition._id != competition._id;
            });
        } else {
            newTeamFavorites.push({ team: team, competition: competition });
        }

        this.currentUserSubject.value.favTeams = newTeamFavorites;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUserSubject.value));
        this.currentUserSubject.next(this.currentUserSubject.value);

        // let mappedTeams = newTeamFavorites.map(x=>  { return {team:x.team._id, competition: x.competition._id}});
        let postData = { "team": team._id, "competition": competition._id };

        return this.http.post<any>(`${this.Config.getApi("ROOT")}/users/favTeam`, postData)
            .pipe(map(response => {
                return response;
            }));
    }

    updateAvatar(avatarUrl: string) {
        this.currentUserSubject.value.picture = avatarUrl;
        this.currentUserSubject.next(this.currentUserSubject.value);
        let postData = { "picture": avatarUrl };

        return this.http.put<any>(`${this.Config.getApi("ROOT")}/users/${this.currentUserSubject.value._id}`, postData)
            .pipe(map(response => {
                // console.log(response);
                // console.log("Updating avatar");
                localStorage.setItem('currentUser', JSON.stringify(this.currentUserSubject.value));
                return response;
            }));
    }

    pay(contestPrice: number) {
        this.currentUserSubject.value.wallet -= contestPrice;
        this.currentUserSubject.next(this.currentUserSubject.value);
    }

    collectLoyalty() {

        return this.http.post<any>(`${this.Config.getApi("ROOT")}/users/loyalty`, {})
            .pipe(map(response => {
                this.currentUserSubject.value.loyaltyCoins = 0;
                this.currentUserSubject.next(this.currentUserSubject.value);
                return response;
            }));
    }

    addDemoOneWeekSubscription() {
        this.currentUserSubject.value.subscriptionEnd = moment().utc().add(6, 'd').toDate();
        this.currentUserSubject.next(this.currentUserSubject.value);
    }

    get isSubscribed() {
        if (!this.currentUserSubject.value || !this.currentUserSubject.value.subscriptionEnd)
            return false;
            
        return moment().utc().toDate() <= moment(this.currentUserSubject.value.subscriptionEnd).utc().toDate();
    }

    // https://clientserver-3.herokuapp.com/client-api/v1/users/blaise/validate-subscription
    validateUserSubscription() {
        return this.http.get<any>(`${this.Config.getApi("ROOT")}/users/blaise/validate-subscription`)
            .pipe(map(response => {
                return response;
            }));
    }

    /*-----------------------------------------------------------------------------------
     User polling
   ----------------------------------------------------------------------------------- */
    pollingInterval;
    pollingTime: number = 15;
    pollingTimeLeft: number = 15;

    startUserPolling() {
        this.pollingInterval = setInterval(() => {
            // console.log(this.pollingTimeLeft);

            if (this.pollingTimeLeft > 0) {
                this.pollingTimeLeft--;
            } else {
                this.pollingTimeLeft = this.pollingTime;
                this.http.get<any>(`${this.Config.getApi("ROOT")}/user`)
                    .subscribe(response => {
                        // console.log(response);
                        let updated = false;
                        if (this.currentUserSubject.value.wallet != response.wallet) {
                            this.currentUserSubject.value.wallet = response.wallet;
                            updated = true;
                        }
                        if (this.currentUserSubject.value.unread != response.unread) {
                            this.currentUserSubject.value.unread = response.unread;
                            updated = true;
                        }
                        if (updated) {
                            // this.currentUserSubject.value.unread = 1;
                            this.currentUserSubject.next(this.currentUserSubject.value);
                            this.stopPolling();
                        }

                    });
            }
        }, 1000)
    }

    checkUserStatus() {
        this.http.get<any>(`${this.Config.getApi("ROOT")}/user`)
            .subscribe(response => {
                // console.log(response);
                let updated = false;
                if (this.currentUserSubject.value.wallet != response.wallet) {
                    this.currentUserSubject.value.wallet = response.wallet;
                    updated = true;
                }
                if (this.currentUserSubject.value.unread != response.unread) {
                    this.currentUserSubject.value.unread = response.unread;
                    updated = true;
                }
                if (updated) {
                    // this.currentUserSubject.value.unread = 1;
                    this.currentUserSubject.next(this.currentUserSubject.value);
                }

            });
    }

    stopPolling() {
        clearInterval(this.pollingInterval);
    }

    markInboxRead() {
        this.currentUserSubject.value.unread = 0;
        this.currentUserSubject.next(this.currentUserSubject.value);
    }

}