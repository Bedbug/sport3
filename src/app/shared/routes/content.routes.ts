import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from 'src/app/main/main.component';
import { ContestPagesComponent } from 'src/app/contest-pages/contest-pages.component';

export const content: Routes = [
  {
    path: 'base',
    loadChildren: './components/base/base.module#BaseModule'
  },
  {
    path: 'pages',
    loadChildren: './pages/page/page.module#PageModule'
  },
  {
    path: 'main',
    component: MainComponent,
    loadChildren: './main/main.module#MainModule'
  },{
    path:'contest/:id',
    component: ContestPagesComponent,
    loadChildren: './contest-pages/contest-pages.module#ContestPagesModule'
  },
  {
    path:'**',
    redirectTo:'main/contests'
  }
];