import { flatten } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import moment from 'moment-mini';
import * as CryptoJS from 'crypto-js'; 

declare var sessionToken;

@Injectable({
  providedIn: 'root'
})
export class TpayService {
  private renderer: Renderer2;
  constructor(
    rendererFactory: RendererFactory2
  ) { 
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  tpayScripLoaded: boolean = false;
  sessionToken:string;

  getSessionToken() {
    // var URL = "https://enrichment.tpay.me/idxml.ashx/js";

    //------- Production
    // var URL =  "https://enrichment-staging.tpay.me/idxml.ashx/js-staging";
    // var privateKey = "Vd7ClaC8p06536TfF09I";
    // var publicKey ="gBkPzf58YzzK1Dc1FGL5";

    // ------ Dev
    var URL =  "http://enrichment-staging.tpay.me/idxml.ashx/js-staging";
    var privateKey = "yDk4q11ZEYRCotrq0mUl";
    var publicKey ="NkXCj2z01PFKaTWGgfGN";
   

    var timeNow: string = moment().utc().toISOString();
    var toBeHashed = 'date'; //'date:'+timeNow;
    var toBeHashed = 'date:'+timeNow;
    var toBeHashed = timeNow; //'date:'+timeNow;
    var message = this.signKey(privateKey,toBeHashed);
    
    console.log(timeNow);
    console.log(toBeHashed);
    
    console.log(message);
    var messageDigest = publicKey+":"+message;
    var scriptUrl = URL+`?date=${timeNow}&lang=null&theme=null&fullscreen=null&digest=${messageDigest}`;
    // console.log(scriptUrl);
   
    if (!this.tpayScripLoaded) {
     
      this.renderExternalScript(scriptUrl).onload = () => {
        console.log('TPAY Script loaded');
        return "NADA";
        // do something with this library
      }
    }
    else
    return sessionToken();
  }

   signKey (clientKey: string, msg: string) {
    
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
