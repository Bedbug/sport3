import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Contest } from '../models/contest';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GrandPrize } from '../models/grand-prize';

@Injectable({
  providedIn: 'root'
})
export class SportimoApiService {

  constructor(private http: HttpClient, private Config: ConfigService) {        
  }

  getGrandPrize() {
    return this.http.get<GrandPrize>(`${this.Config.getApi("GRAND_PRIZE")}/${this.Config.getClient()}`);
  }

  getContests() {      
      return this.http.get<Contest[]>(`${this.Config.getApi("CONTESTS")}/${this.Config.getClient()}`);            
  }



}
