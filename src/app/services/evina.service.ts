import { Injectable, Renderer2, RendererFactory2, NgZone } from '@angular/core';
import { ConfigService } from './config.service';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { inject } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class EvinaService {

  private renderer: Renderer2;
  public transactionID: string = null;
  public timestamp: number;

  declare ia: any;
  script: any;

  constructor(
    private http: HttpClient,
    private rendererFactory: RendererFactory2,
    private configService: ConfigService,
    private zone: NgZone
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    // this.sessionToken = new BehaviorSubject<string>(null);
  }

  loadScript() {
    console.log("-------- Loading script");
    // if(this.injecting)
    //   return;
    this.injecting = true;
    this.http.get<any>(`${this.configService.getApi("ROOT")}/data/client/${this.configService.getClient()}/protection?domTarget=.pin-verify`, {})
      .pipe(map(response => {

        if (response.script) {
          this.transactionID = response.transactionId;
          this.timestamp = response.timestamp;

          // console.log(response.script);

          this.renderExternalScript(response.script);
        }
      })).subscribe();
  }
  injecting: boolean = false;
  renderExternalScript(evinaScript: any) {
    console.log("---------- Injecting script");
    this.zone.runOutsideAngular(() => {
      var root = document.getElementsByTagName('head');
      this.script = document.createElement('script');
      this.script.type = 'text/javascript';
      this.script.text = evinaScript;
      this.renderer.appendChild(root[0], this.script);
      var event = new Event('DCBProtectRun');
      document.dispatchEvent(event);
    })
  }

  removeScript(){
    console.log("Removing Evina Script");
    
    this.script.remove();
  }
}
