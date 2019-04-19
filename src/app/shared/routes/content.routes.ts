import { Routes, RouterModule } from '@angular/router';

export const content: Routes = [
  {
    path: 'base',
    loadChildren: './components/base/base.module#BaseModule'
  },
  {
    path: 'pages',
    loadChildren: './pages/page/page.module#PageModule'
  }
];