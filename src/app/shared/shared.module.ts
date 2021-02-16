import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './menu/sidebar/sidebar.component';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';
import { ToggleFullscreenDirective } from "./directives/fullscreen.directive";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../components/login/login.component'
import { TranslateModule } from '@ngx-translate/core';
import { RegisterComponent } from '../components/register/register.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent, 
    SidebarComponent, 
    ChatSidebarComponent, 
    ToggleFullscreenDirective, 
    LoginComponent, 
    RegisterComponent
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,    //added here too
    ReactiveFormsModule, 
    TranslateModule
  ],
  exports: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent, 
    ChatSidebarComponent, 
    ToggleFullscreenDirective, 
    LoginComponent, 
    RegisterComponent]
})
export class SharedModule { }