import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { ContentComponent } from './layouts/content/content.component';
import { content } from "./shared/routes/content.routes";
import { ResetComponent } from './reset/reset.component';



const appRoutes: Routes = [
  
  {
    path:'reset/:token',
    component: ResetComponent
  },
  {
    path:'',
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