import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent  },
  { path: 'dashboard', component: DashboardComponent  },
  { path: 'settings', component: DashboardComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
