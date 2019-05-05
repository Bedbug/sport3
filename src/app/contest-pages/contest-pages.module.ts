import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestPagesRoutingModule } from './contest-pages-routing.module';
import { ContestPageInfoComponent } from './contest-page-info/contest-page-info.component';

@NgModule({
  declarations: [
    ContestPageInfoComponent,
  ],
  imports: [
    CommonModule,
    ContestPagesRoutingModule
  ]
})
export class ContestPagesModule { }
