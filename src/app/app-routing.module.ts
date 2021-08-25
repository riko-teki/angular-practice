import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { UnauthenticateGuard } from './guards/unauthenticate.guard';
import { LoginComponent } from './views/pages/login/login.component';
import { MaintenancePlansGroupComponent } from './views/pages/maintenance-plans-group/maintenance-plans-group.component';
import { MaintenanceGroupDetailComponent } from './views/pages/maintenance-group-detail/maintenance-group-detail.component';
import { GroupRegistResultComponent } from './views/pages/group-regist-result/group-regist-result.component';
import { RegistResultSummaryPageComponent } from './views/pages/regist-result-summary-page/regist-result-summary-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthenticatedGuard] },
  // { path: 'maintenances/:factory', component: MaintenancePlansComponent, canActivate: [UnauthenticateGuard] },
  { path: 'maintenances-group/:factory', component: MaintenancePlansGroupComponent, canActivate: [UnauthenticateGuard] },
  // { path: 'maintenances-group/:factory/:date/:facilitycode', component: MaintenanceGroupDetailComponent, canActivate: [UnauthenticateGuard] },
  // { path: 'maintenances-group/:factory/:date/:facilitycode/group-regist-result', component: GroupRegistResultComponent, canActivate: [UnauthenticateGuard] },
  { path: 'maintenances-group/:factory/:date/:facilitycode/regist-result-summary', component: RegistResultSummaryPageComponent, canActivate: [UnauthenticateGuard] },
  // { path: 'maintenances/:factory/:plangroupid/:planid', component: MaintenanceDetailComponent, canActivate: [UnauthenticateGuard] },
  // { path: 'maintenances/:factory/:plangroupid/:planid/regist-result', component: RegistresultComponent, canActivate: [UnauthenticateGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
