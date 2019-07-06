import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from 'src/app/sections/main/main.component';
import { ContestPagesComponent } from 'src/app/sections/contest-pages/contest-pages.component';
import { MatchPagesComponent } from 'src/app/sections/match-pages/match-pages.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const content: Routes = [
  // {
  //   path: 'pages',
  //   loadChildren: () => import('src/app/pages/page/page.module').then(m => m.PageModule)
  // },
  {
    path: 'main',
    component: MainComponent,
    loadChildren:  () => import('src/app/sections/main/main.module').then(m => m.MainModule)
  },{
    path:'contest/:contestId',
    component: ContestPagesComponent,
    loadChildren: () => import('src/app/sections/contest-pages/contest-pages.module').then(m => m.ContestPagesModule)
  },
  {
    path:'contest/:contestId/match/:contestMatchId',
    component: MatchPagesComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('src/app/sections/match-pages/match-pages.module').then(m => m.MatchPagesModule)
  },
  {
    path:'**',
    redirectTo:'main/contests'
  }
];