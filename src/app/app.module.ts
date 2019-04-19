import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { ContentComponent } from './layouts/content/content.component';
import * as $ from 'jquery';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
