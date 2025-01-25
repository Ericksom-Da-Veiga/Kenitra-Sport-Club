import { Component, OnInit } from '@angular/core';
import { AbonnementResponse, AbonnementService } from 'src/app/services/abonnement/abonnement.service';
import { AdherantService } from 'src/app/services/adherant/adherant.service';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { differenceInDays} from 'date-fns';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss']
})
export class DashboardTableComponent implements OnInit{

  Abonnements!: AbonnementResponse[];


  // Varables pour la pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  nombre: number = 0;

  constructor(
    private dashboardService: DashboardService,
    private Abonnementservice: AbonnementService,
    private AdherantService: AdherantService
  ){}

  ngOnInit(): void {
    this.getAbonnements();
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getAbonnements(){
    this.dashboardService.getAbonnements().subscribe((res :any)=>{
      this.Abonnements = res.data;

      this.Abonnements.forEach(abonnement =>{
        this.AdherantService.detailAdherant(abonnement.id_adherant).subscribe((res:any)=>{
          abonnement.cin = res.data[0].cin;
          abonnement.nom = res.data[0].nom;
          abonnement.prenom = res.data[0].prenom;
          //recuperer la dure du abonnement
          abonnement.duree = differenceInDays(abonnement.date_fin, abonnement.date_debut);
          //definir le type d'abonnement
          if (abonnement.duree === 365) {
            abonnement.typeAbonnement = "Anuel";
          } else if (abonnement.duree > 80 && abonnement.duree <= 100) {
            abonnement.typeAbonnement = "Trimensuel";
          } else {
            abonnement.typeAbonnement = "Mensuel"
          }
        })
      })
    })
  }
}
