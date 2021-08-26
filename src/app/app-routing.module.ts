import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { UnauthenticateGuard } from './guards/unauthenticate.guard';
import { MaintenanceDetailComponent } from './views/layouts/maintenance-detail/maintenance-detail.component';
import { RegistResultComponent } from './views/layouts/regist-result/regist-result.component';
import { LoginComponent } from './views/pages/login/login.component';
import { MaintenancePlansPageComponent } from './views/pages/maintenance-plans-page/maintenance-plans-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthenticatedGuard] },
  { path: 'maintenances', component: MaintenancePlansPageComponent, canActivate: [UnauthenticateGuard] },
  { path: 'maintenances/:maintenanceID', component: MaintenanceDetailComponent, canActivate: [UnauthenticateGuard] },
  { path: 'maintenances/:maintenanceID/regist-result', component: RegistResultComponent, canActivate: [UnauthenticateGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
