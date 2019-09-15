import { NgModule, Injectable } from '@angular/core';
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
// import { OverlayModule } from '@angular/cdk/overlay';
import { ToastModule } from './components/card-toast/toast.module';
import { CardToastComponent } from './components/card-toast/card-toast.component';

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
    CardToastComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
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
    ModalModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ToastModule.forRoot(),
  ],
  exports: [
    TranslateModule
  ],
  entryComponents: [NotyfToastSuccess, NotyfToastError],
  providers: [
    ConfigService,
    ConfigModule.init(),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
