import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//自作コンポーネント群
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './views/pages/login/login.component';
import { MaintenancePlansComponent } from './views/layouts/maintenance-plans/maintenance-plans.component';
import { HttpClientModule } from '@angular/common/http';
import { MaintenanceComponent } from './views/parts/maintenance/maintenance.component';
import { MaintenanceDetailComponent } from './views/layouts/maintenance-detail/maintenance-detail.component'
import { RegistResultComponent } from './views/layouts/regist-result/regist-result.component';
import { SearchConditionsComponent } from './views/layouts/search-conditions/search-conditions.component';
import { ChipsComponent } from './views/parts/chips/chips.component';
import { AfterDecimalPointLengthPipe } from './pipes/after-decimal-point-length.pipe';

//Angular Materialのモジュール群
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ConfirmDialogComponent } from './views/parts/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AccountComponent } from './views/parts/account/account.component';
import { RegistResultPageComponent } from './views/pages/regist-result-page/regist-result-page.component';
import { MaintenanceDatailPageComponent } from './views/pages/maintenance-datail-page/maintenance-datail-page.component';
import { InMemoryWebApiService } from './services/in-memory-web-api.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MaintenancePlansPageComponent } from './views/pages/maintenance-plans-page/maintenance-plans-page.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MaintenanceComponent,
    MaintenanceDetailComponent,
    RegistResultComponent,
    SearchConditionsComponent,
    ChipsComponent,
    ConfirmDialogComponent,
    AfterDecimalPointLengthPipe,
    AccountComponent,
    RegistResultPageComponent,
    MaintenanceDatailPageComponent,
    MaintenancePlansPageComponent,
    MaintenancePlansComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSelectModule,
    MatDividerModule,
    MatCheckboxModule,
    MatTooltipModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDialogModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryWebApiService)
  ],
  providers: [
    InMemoryWebApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
