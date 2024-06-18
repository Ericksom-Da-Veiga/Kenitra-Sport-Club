import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableAdherantsComponent } from './components/table-adherants/table-adherants.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { DashboardCardsComponent } from './components/dashboard-cards/dashboard-cards.component';
import { DashboardTableComponent } from './components/dashboard-table/dashboard-table.component';
import { FormPayementComponent } from './components/form-payement/form-payement.component';
import { FormAdherantComponent } from './components/form-adherant/form-adherant.component';
import { FormSportComponent } from './components/form-sport/form-sport.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TableMonitorsComponent } from './components/table-monitors/table-monitors.component';
import { TablePayementsComponent } from './components/table-payements/table-payements.component';
import { TableSportsComponent } from './components/table-sports/table-sports.component';
import { FormMonitorComponent } from './components/form-monitor/form-monitor.component';
import { AdherantComponent } from './view/adherant/adherant.component';
import { AdherantEditComponent } from './view/adherant-edit/adherant-edit.component';
import { AdherantAddComponent } from './view/adherant-add/adherant-add.component';
import { SportComponent } from './view/sport/sport.component';
import { SportEditComponent } from './view/sport-edit/sport-edit.component';
import { SportAddComponent } from './view/sport-add/sport-add.component';
import { PayementComponent } from './view/payement/payement.component';
import { PayementEditComponent } from './view/payement-edit/payement-edit.component';
import { PayementAddComponent } from './view/payement-add/payement-add.component';
import { MonitorsComponent } from './view/monitors/monitors.component';
import { MonitorsEditComponent } from './view/monitors-edit/monitors-edit.component';
import { MonitorsAddsComponent } from './view/monitors-adds/monitors-adds.component';
import { LoginComponent } from './view/login/login.component';
import { SettingsComponent } from './view/settings/settings.component';
import { StatistiquesComponent } from './view/statistiques/statistiques.component';
import { AbonnementComponent } from './view/abonnement/abonnement.component';
import { AbonnementAddComponent } from './view/abonnement-add/abonnement-add.component';
import { FormAbonnementComponent } from './components/form-abonnement/form-abonnement.component';
import { TableAbonnementComponent } from './components/table-abonnement/table-abonnement.component';
import { FormsModule } from '@angular/forms';
import { EditAdherantComponent } from './components/edit-adherant/edit-adherant.component';
import { EditCoachComponent } from './components/edit-coach/edit-coach.component';
import { EditSportComponent } from './components/edit-sport/edit-sport.component';
import { EditAbonnementComponent } from './components/edit-abonnement/edit-abonnement.component';
import { EditPayementComponent } from './components/edit-payement/edit-payement.component';
import { AbonnementEditComponent } from './view/abonnement-edit/abonnement-edit.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    TableAdherantsComponent,
    DashboardComponent,
    DashboardCardsComponent,
    DashboardTableComponent,
    FormPayementComponent,
    FormAdherantComponent,
    FormSportComponent,
    NavbarComponent,
    SidenavComponent,
    TableMonitorsComponent,
    TablePayementsComponent,
    TableSportsComponent,
    FormMonitorComponent,
    AdherantComponent,
    AdherantEditComponent,
    AdherantAddComponent,
    SportComponent,
    SportEditComponent,
    SportAddComponent,
    PayementComponent,
    PayementEditComponent,
    PayementAddComponent,
    MonitorsComponent,
    MonitorsEditComponent,
    MonitorsAddsComponent,
    LoginComponent,
    SettingsComponent,
    StatistiquesComponent,
    AbonnementComponent,
    AbonnementAddComponent,
    FormAbonnementComponent,
    TableAbonnementComponent,
    EditAdherantComponent,
    EditCoachComponent,
    EditSportComponent,
    EditAbonnementComponent,
    EditPayementComponent,
    AbonnementEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
