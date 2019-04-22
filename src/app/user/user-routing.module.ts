import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { ContestsComponent } from './contests/contests.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'contests',
        component: ContestsComponent
      },
      {
        path: 'winners',
        component: StarterComponent
      },
      {
        path: 'achievements',
        component: StarterComponent
      },
      {
        path: 'standings',
        component: StarterComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
