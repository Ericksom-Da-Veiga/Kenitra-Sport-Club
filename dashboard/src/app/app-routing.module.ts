import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { AdherantComponent } from './view/adherant/adherant.component';
import { AdherantEditComponent } from './view/adherant-edit/adherant-edit.component';
import { PayementComponent } from './view/payement/payement.component';
import { PayementEditComponent } from './view/payement-edit/payement-edit.component';
import { PayementAddComponent } from './view/payement-add/payement-add.component';
import { SportComponent } from './view/sport/sport.component';
import { MonitorsComponent } from './view/monitors/monitors.component';
import { MonitorsAddsComponent } from './view/monitors-adds/monitors-adds.component';
import { MonitorsEditComponent } from './view/monitors-edit/monitors-edit.component';
import { StatistiquesComponent } from './view/statistiques/statistiques.component';
import { LoginComponent } from './view/login/login.component';
import { SettingsComponent } from './view/settings/settings.component';
import { AdherantAddComponent } from './view/adherant-add/adherant-add.component';
import { SportEditComponent } from './view/sport-edit/sport-edit.component';
import { SportAddComponent } from './view/sport-add/sport-add.component';
import { AbonnementComponent } from './view/abonnement/abonnement.component';
import { AbonnementAddComponent } from './view/abonnement-add/abonnement-add.component';
import { EditAbonnementComponent } from './components/edit-abonnement/edit-abonnement.component';
import { AbonnementEditComponent } from './view/abonnement-edit/abonnement-edit.component';
import { AbonnementDetailComponent } from './view/abonnement-detail/abonnement-detail.component';

const routes: Routes = [
  {path: "dashboard", component: DashboardComponent, title: "Dashboard"},
  {path: "", component: DashboardComponent, title: "Dashboard"},


  {path: "adherant", component: AdherantComponent,title: "Adherant" },
  {path: "adherant/:id/edit", component: AdherantEditComponent, title:"Edit adherant"},
  {path: "adherant/add", component: AdherantAddComponent,title: "Ajouter Adherant" },

  {path: "payement", component: PayementComponent, title: "Payements"},
  {path: "payement/:id/edit", component: PayementEditComponent, title:"Edit Payement"},
  {path: "payement/add", component: PayementAddComponent,title: "Ajouter Payement" },

  {path: "abonnement", component: AbonnementComponent, title: "Abonnements"},
  {path: "abonnement/:id/edit", component: AbonnementEditComponent, title: "Edit Abonnement"},
  {path: "abonnement/add", component: AbonnementAddComponent,title: "Ajouter Abonnement" },
  {path: "abonnement/detail/:id", component: AbonnementDetailComponent, title: "Detail Abonnement"},
  
  {path: "sports", component: SportComponent,title: "Sports"},
  {path: "sports/:id/edit", component: SportEditComponent, title:"Edit Sports"},
  {path: "sports/add", component: SportAddComponent,title: "Ajouter Sports" },

  {path: "monitor", component: MonitorsComponent,title: "Monitor"},
  {path: "monitor/add", component: MonitorsAddsComponent,title: "Ajouter Monitor"},
  {path: "monitor/:id/edit", component: MonitorsEditComponent,title: "Edit Monitor"},

  {path: "statistique", component: StatistiquesComponent, title: "Statistiques"},
  {path: "login", component: LoginComponent,title: "Login"},
  {path: "settings",component: SettingsComponent, title: "settings"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
