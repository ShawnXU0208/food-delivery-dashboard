import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";

import { DashboardBodyComponent } from './dashboard-body/dashboard-body.component';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';


const routes: Routes = [

  {path: 'dashboard', component: DashboardListComponent},
  {path: 'dashboard/:id', component: DashboardBodyComponent, outlet: "appRight"}
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
