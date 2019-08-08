import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToppickService {

  // Initializing the observable value that opens and closes the modal
  topPickModalIsActive: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);;

  constructor() {    
   }

   Show(){
    this.topPickModalIsActive.next(true);
   }

   Hide(){
    this.topPickModalIsActive.next(false);
   }
}
