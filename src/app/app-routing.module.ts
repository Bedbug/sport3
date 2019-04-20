import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { ContentComponent } from './layouts/content/content.component';
import { content } from "./shared/routes/content.routes";


const appRoutes: Routes = [
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