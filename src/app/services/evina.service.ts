import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ConfigService } from './config.service';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EvinaService {

  private renderer: Renderer2;
  public transactionID: string = null;

  declare ia: any;

  constructor(
    private http: HttpClient,
    private rendererFactory: RendererFactory2,
    private configService: ConfigService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    // this.sessionToken = new BehaviorSubject<string>(null);
  }

  loadScript() {

    this.http.get<any>(`${this.configService.getApi("ROOT")}/data/client/${this.configService.getClient()}/protection?domTarget=verify-buton`, {})
      .pipe(map(response => {

        if (response.script) {
          this.transactionID = response.transactionId;
          this.renderExternalScript(response.script);
        }
      })).subscribe();


  }

  renderExternalScript(evinaScript: any) {
    var root = document.getElementsByTagName('head');
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = evinaScript;
    this.renderer.appendChild(root[0], script);
  }
}
