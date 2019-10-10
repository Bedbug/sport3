import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnBoardService {

  // Initializing the observable value that opens and closes the modal
  onboardModalIsActive: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {    
   }

   Show(){
    this.onboardModalIsActive.next(true);
   }

   Hide(){
    this.onboardModalIsActive.next(false);
   }
}
