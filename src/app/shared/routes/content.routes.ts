import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from 'src/app/user/user.component';
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
    path: 'user',
    component: UserComponent,
    loadChildren: './user/user.module#UserModule'
  },{
    path:'contest',
    component: ContestPagesComponent,
    loadChildren: './contest-pages/contest-pages.module#ContestPagesModule'
  }
];