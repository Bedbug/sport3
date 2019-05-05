import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContestPageInfoComponent} from './contest-page-info/contest-page-info.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'info',
        component: ContestPageInfoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestPagesRoutingModule { }
