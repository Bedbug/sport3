import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { ConfigService } from './config.service';
import { Team } from '../models/team';
import moment from 'moment-mini';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    lo: any;
    curren: any;

    constructor(private http: HttpClient, private Config: ConfigService) {
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

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    updateFavorites(team: Team, competition: any, remove: boolean) {
        let newTeamFavorites: any[] = this.currentUserSubject.value.favTeams;

        if (remove) {
            newTeamFavorites = newTeamFavorites.filter(favteam => favteam.team._id != team._id && favteam.competition._id != competition._id);
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
                console.log(response);
                console.log("Updating avatar");
                localStorage.setItem('currentUser', JSON.stringify(this.currentUserSubject.value));
                return response;
            }));
    }

    pay(contestPrice: number) {
        this.currentUserSubject.value.wallet -= contestPrice;
        this.currentUserSubject.next(this.currentUserSubject.value);
    }

    addDemoOneWeekSubscription() {
        this.currentUserSubject.value.subscriptionEnd = moment().utc().add(6, 'd').toDate();
        this.currentUserSubject.next(this.currentUserSubject.value);
    }

}