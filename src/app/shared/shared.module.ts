import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './menu/sidebar/sidebar.component';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';
import { ToggleFullscreenDirective } from "./directives/fullscreen.directive";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent} from '../components/login/login.component'
import { from } from 'rxjs';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent,  ChatSidebarComponent, ToggleFullscreenDirective,LoginComponent],
  imports: [CommonModule, RouterModule,FormsModule,    //added here too
    ReactiveFormsModule],
  exports: [HeaderComponent, FooterComponent, SidebarComponent, ChatSidebarComponent, ToggleFullscreenDirective,LoginComponent]
})
export class SharedModule { }