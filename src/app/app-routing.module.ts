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
    path:'app/:cid',
    component: ContentComponent,
  	children: content
  },{
    path:'',
    redirectTo:'app/0',
    pathMatch:'full'
  },{
    path:'**',
    redirectTo:'app/0',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}