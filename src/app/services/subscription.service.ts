import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Subscription } from '../models/subscription';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private currentSubscriptionSubject: BehaviorSubject<Subscription>;
  public currentSubscriptionData: Observable<Subscription>;


  constructor(private http: HttpClient, private Config: ConfigService) { 
    this.currentSubscriptionSubject = new BehaviorSubject<Subscription>(null);
    this.currentSubscriptionData = this.currentSubscriptionSubject.asObservable();
  }

 

  // public get subscriptionData():Subscription{
  //   return this.currentubscriptionData
  // }

  getSubscriptionDataForUser(userId:string){
    console.log(userId);
    console.log("Check State")  
    return this.http.post<any>(`${this.Config.getApi("SUBSCRIPTION")}`, { userId })
            .pipe(map(subscriptionData => {    
                        console.log(subscriptionData);
                if (subscriptionData) {
                    this.currentSubscriptionSubject.next(subscriptionData);
                }
                return subscriptionData;
            }));
  }
}
