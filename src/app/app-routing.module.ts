import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

// Components
import { ContentComponent } from './layouts/content/content.component';
// Routes
import { content } from "./shared/routes/content.routes";


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'pages/stater-kit',
    pathMatch: 'full',
  },
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