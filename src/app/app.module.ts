import { NgModule } from '@angular/core';
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
import { MainComponent } from './main/main.component';
import { ContestPagesComponent } from './contest-pages/contest-pages.component';
import { ContestInfoHeaderComponent } from './contest-pages/contest-info-header/contest-info-header.component';
import { SubscribeNoticeComponent } from './subscribe-notice/subscribe-notice.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    MainComponent,
    ContestPagesComponent,
    ContestInfoHeaderComponent,
    SubscribeNoticeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule 
  ],
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
