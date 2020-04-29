import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnBoardService {

  public defaults = {
    sequence:["S","L"],
    slides: [
      {
        state: true,
        text: "localizedText",
        image: "localImageName"
      },
      {
        state: true,
        text: "",
        image: ""
      },
      {
        state: true,
        text: "",
        image: ""
      },
      {
        state: true,
        text: "",
        image: ""
      }
    ],
    landingPage:{
      background:"",
      terms:"localizedText",
      slidesShow:[
        {
          header:"localizedText",
          image: "imageUrl",
          prizeText:"localizedText"
        }
      ]
    }
  }

  // Initializing the observable value that opens and closes the modal
  onboardModalIsActive: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {
  }

  Show(config: any) {
    if (config && config != null)
      this.defaults = config;
    console.log("Show Count");
    
    this.onboardModalIsActive.next(true);
  }

  Hide() {
    this.onboardModalIsActive.next(false);
  }
}
