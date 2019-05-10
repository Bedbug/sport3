import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from 'src/app/sections/main/main.component';
import { ContestPagesComponent } from 'src/app/sections/contest-pages/contest-pages.component';
import { MatchPagesComponent } from 'src/app/sections/match-pages/match-pages.component';

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
    loadChildren:  'src/app/sections/main/main.module#MainModule'
  },{
    path:'contest/:id',
    component: ContestPagesComponent,
    loadChildren: 'src/app/sections/contest-pages/contest-pages.module#ContestPagesModule'
  },
  {
    path:'contest/:contestId/match/:contestMatchId',
    component: MatchPagesComponent,
    loadChildren: 'src/app/sections/match-pages/match-pages.module#MatchPagesModule'
  },
  {
    path:'**',
    redirectTo:'main/contests'
  }
];