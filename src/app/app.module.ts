import { NgModule, Injectable } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ContentComponent } from './layouts/content/content.component';
import * as $ from 'jquery';
import { ConfigService, ConfigModule } from './services/config.service';
import { JwtInterceptor } from './helpers/jws.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { fakeBackendProvider } from './helpers/fake-backend';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscribeNoticeComponent } from './subscribe-notice/subscribe-notice.component';
import { MainComponent } from './sections/main/main.component';
import { ContestPagesComponent } from './sections/contest-pages/contest-pages.component';
import { ContestInfoHeaderComponent } from './sections/contest-pages/contest-info-header/contest-info-header.component';
import { MatchPagesComponent } from './sections/match-pages/match-pages.component';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
 
// const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };



@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    MainComponent,
    ContestPagesComponent,
    ContestInfoHeaderComponent,
    SubscribeNoticeComponent,
    MatchPagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    // SocketIoModule.forRoot(config)
  ],
  providers: [
    ConfigService,
    ConfigModule.init(),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
