import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './menu/sidebar/sidebar.component';
import { CompactSidebarComponent } from './menu/compact-sidebar/compact-sidebar.component';
import { CompactSidebarIconsComponent } from './menu/compact-sidebar-icons/compact-sidebar-icons.component';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';
import { ToggleFullscreenDirective } from "./directives/fullscreen.directive";

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent, CompactSidebarComponent, CompactSidebarIconsComponent, ChatSidebarComponent, ToggleFullscreenDirective],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, SidebarComponent,  CompactSidebarComponent, CompactSidebarIconsComponent,ChatSidebarComponent, ToggleFullscreenDirective]
})
export class SharedModule { }
