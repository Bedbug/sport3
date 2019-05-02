import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'contests',
        component: HomeComponent
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
