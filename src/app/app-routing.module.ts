import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { ContentComponent } from './layouts/content/content.component';
import { FullWidthComponent } from './layouts/full-width/full-width.component';
import { CompactSidebarComponent } from './layouts/compact-sidebar/compact-sidebar.component';
import { CompactSidebarIconsComponent } from './layouts/compact-sidebar-icons/compact-sidebar-icons.component';// Routes
import { content } from "./shared/routes/content.routes";


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'pages/stater-kit',
    pathMatch: 'full',
  },
  // { 
  // 	path: '', 
  // 	component: ContentComponent,
  // 	children: content 
  // }
  { 
  	path: '', 
  	component: ContentComponent,
  	children: content 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}