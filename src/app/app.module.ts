import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { FullWidthComponent } from './layouts/full-width/full-width.component';
import { ContentComponent } from './layouts/content/content.component';
import { CompactSidebarComponent } from './layouts/compact-sidebar/compact-sidebar.component';
import { CompactSidebarIconsComponent } from './layouts/compact-sidebar-icons/compact-sidebar-icons.component';
import * as $ from 'jquery';

@NgModule({
  declarations: [
    AppComponent,
    FullWidthComponent,
    ContentComponent,
    CompactSidebarComponent,
    CompactSidebarIconsComponent
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
