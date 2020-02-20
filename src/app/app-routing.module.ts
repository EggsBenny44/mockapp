import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppformComponent } from './pages/appform/appform.component';
import { ListformComponent } from './pages/listform/listform.component';


const routes: Routes = [
  { path: 'appform/:wid/:exc', component: AppformComponent },
  { path: 'listform/:wid', component: ListformComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
