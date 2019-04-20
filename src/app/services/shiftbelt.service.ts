import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { ShiftSwapRequest } from '../models/shiftswap-request';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShiftBeltService {
   

    constructor(private http: HttpClient, private Config: ConfigService) {        
    }

    
    getShiftRequests() {      
        return this.http.get<ShiftSwapRequest[]>(`${this.Config.getApi("SHIFT")}/requests`);            
    }

}
