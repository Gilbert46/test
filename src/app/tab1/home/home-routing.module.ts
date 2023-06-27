import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Home1Page } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: Home1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
