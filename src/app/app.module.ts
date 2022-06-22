import { NgModule, Injectable } from '@angular/core';
import { CookieService} from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ContentComponent } from './layouts/content/content.component';
import * as $ from 'jquery';
import { ConfigService, ConfigModule } from './services/config.service';
import { JwtInterceptor } from './helpers/jws.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { fakeBackendProvider } from './helpers/fake-backend';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscribeNoticeComponent } from './components/subscribe-notice/subscribe-notice.component';
import { MainComponent } from './sections/main/main.component';
import { ContestPagesComponent } from './sections/contest-pages/contest-pages.component';
import { ContestInfoHeaderComponent } from './sections/contest-pages/contest-info-header/contest-info-header.component';
import { MatchPagesComponent } from './sections/match-pages/match-pages.component';
import { ToastrModule } from 'ngx-toastr';
import { NotyfToastSuccess } from './components/custom-toast/notyf.toast';
import { NotyfToastError } from './components/custom-toast/notyf.error';
import { TranslateHttpLoader } from './helpers/translate-http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ToppickComponent } from './components/toppick/toppick.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { OverlayModule } from '@angular/cdk/overlay';
import { ToastModule } from './components/card-toast/toast.module';
import { CardToastComponent } from './components/card-toast/card-toast.component';
import { GrandPrizeDetailsComponent } from './sections/main/grand-prize-details/grand-prize-details.component';
import { ContestInfoComponent } from './sections/contest-pages/contest-info/contest-info.component';
import { OnboardComponent } from './components/onboard/onboard.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ResetComponent } from './reset/reset.component';
import { MainPageNewsComponent } from './sections/main/main-page-news/main-page-news.component';
import { ModalPowersInfoComponent } from './sections/match-pages/match-page-cards/components/modal-powers-info/modal-powers-info.component';
import { MatchSubscribeComponent } from './sections/contest-pages/match-subscribe/match-subscribe.component';
import { SafeHTMLPipe } from './pipes/safe-html.pipe';
import { TermsPopupComponent } from './components/terms-popup/terms-popup.component';
import { CardInfoPopupComponent } from './components/card-info-popup/card-info-popup.component';
import { TermsFooterComponent } from './components/terms-footer/terms-footer.component';
import { GoogleTagManagerModule, GoogleTagManagerService } from 'angular-google-tag-manager';
import { OfflineInterceptor } from './helpers/offline.interceptor';
import { InstallPopupComponent } from './components/install-popup/install-popup.component';



// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    MainComponent,
    ContestPagesComponent,
    NotyfToastSuccess,
    NotyfToastError,
    ContestInfoHeaderComponent,
    SubscribeNoticeComponent,
    MatchPagesComponent,
    ToppickComponent,
    CardToastComponent,
    GrandPrizeDetailsComponent,
    ContestInfoComponent,
    OnboardComponent,
    ResetComponent,
    ModalPowersInfoComponent,
    MatchSubscribeComponent,
    TermsPopupComponent,
    CardInfoPopupComponent,
    TermsFooterComponent,
    InstallPopupComponent
    
  ],
  imports: [
    OverlayModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    PopoverModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    // GoogleTagManagerModule.forRoot({
    //   id: 'GTM-W8FBCL4',
    // }),
    ModalModule.forRoot(),
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    // ServiceWorkerModule.register('custom-service-worker.js', { enabled: environment.production }),
    ToastModule.forRoot(),
    
  ],
  exports: [
    TranslateModule
  ],
  entryComponents: [NotyfToastSuccess, NotyfToastError, GrandPrizeDetailsComponent, ContestInfoComponent, ModalPowersInfoComponent, MatchSubscribeComponent, TermsPopupComponent, CardInfoPopupComponent, InstallPopupComponent],
  providers: [
    ConfigService,
    ConfigModule.init(),
    GoogleTagManagerService,
    { provide: HTTP_INTERCEPTORS, useClass: OfflineInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: 'googleTagManagerId', useValue: 'GTM-W8FBCL4' },
    CookieService,
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
