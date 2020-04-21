import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnBoardService {

  public defaults = {
    Slides: {
      A: {
        state: true,
        text: "",
        image: ""
      },
      B: {
        state: true,
        text: "",
        image: ""
      },
      C: {
        state: true,
        text: "",
        image: ""
      },
      D: {
        state: true,
        text: "",
        image: ""
      }
    }
  }

  // Initializing the observable value that opens and closes the modal
  onboardModalIsActive: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {
  }

  Show(config: any) {
    if (config && config != null)
      this.defaults = config;

    this.onboardModalIsActive.next(true);
  }

  Hide() {
    this.onboardModalIsActive.next(false);
  }
}
