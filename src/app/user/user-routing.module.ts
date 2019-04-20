import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './starter/user.component';
import { ContestsComponent } from './contests/contests.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'stater-kit',
        component: UserComponent
      },
      {
        path: 'contests/:contestID',
        component: ContestsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
