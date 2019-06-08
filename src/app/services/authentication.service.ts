import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { ConfigService } from './config.service';
import { Team } from '../models/team';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private Config: ConfigService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.Config.getApi("ROOT")}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
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

    updateFavorites(team: Team, remove:boolean) {
        
        let newTeamFavorites:any[] = this.currentUserSubject.value.favoriteteams;
       
        if(remove){
            newTeamFavorites = newTeamFavorites.filter(favteam=> favteam._id != team._id);
        }else{
            newTeamFavorites.push(team);
        }
        
        this.currentUserSubject.value.favoriteteams = newTeamFavorites;
        this.currentUserSubject.next(this.currentUserSubject.value);

        let mappedTeams = newTeamFavorites.map(x=>x._id);
        let putData = {"favoriteteams": mappedTeams};
    
        return this.http.put<any>(`${this.Config.getApi("ROOT")}/users/${this.currentUserSubject.value._id}`, putData)
            .pipe(map(response => {       
               return response;             
            }));
      }
}