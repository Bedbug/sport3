import { flatten } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import moment from 'moment-mini';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ConfigService } from './config.service';

declare var TPay;

@Injectable({
  providedIn: 'root'
})
export class TpayService {
  private renderer: Renderer2;
  constructor(
    rendererFactory: RendererFactory2,
    private configService: ConfigService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    // this.sessionToken = new BehaviorSubject<string>(null);
  }

  public sessionToken: Subject<string> = new Subject();
  public cachedSessionToken: string;

  // tpayScripLoaded: boolean = false;
  // sessionToken:string;

  getSessionToken() {
    var URL;
    var prk;
    var pbk;

    
    console.log("Development: "+this.configService.isDevmode());
    
    if (!this.configService.isDevmode()) {
      //------- Production
      URL = "https://enrichment.tpay.me/idxml.ashx/js";
      prk = "Vd7ClaC8p06536TfF09I";
      pbk = "gBkPzf58YzzK1Dc1FGL5";
    } else {
      // ------ Dev
      URL = "http://enrichment-staging.tpay.me/idxml.ashx/js-staging";
      prk = "yDk4q11ZEYRCotrq0mUl";
      pbk = "NkXCj2z01PFKaTWGgfGN";
    }

    var timeNow: string = moment().utc().toISOString();
    var toBeHashed = timeNow; //'date:'+timeNow;
    var message = this.signKey(prk, toBeHashed);

    var messageDigest = pbk + ":" + message;
    var scriptUrl = URL + `?date=${timeNow}&digest=${messageDigest}`;

    if (!this.cachedSessionToken) {

      this.renderExternalScript(scriptUrl).onload = () => {
        console.log('TPAY Script loaded');
        this.cachedSessionToken = TPay.HeaderEnrichment.sessionToken();
        this.sessionToken.next(this.cachedSessionToken);
        // do something with this library
      }
    }
    else
      this.sessionToken.next(this.cachedSessionToken);
  }

  signKey(clientKey: string, msg: string) {

    const signature = CryptoJS.HmacSHA256(msg, clientKey).toString(CryptoJS.enc.Hex);

    return signature;
  }

  renderExternalScript(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
    return script;
  }
}
