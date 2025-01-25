import { Component, OnInit } from '@angular/core';
import { AbonnementResponse, AbonnementService } from 'src/app/services/abonnement/abonnement.service';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  NombreSports!: number;
  NombreAbonnements!: number;
  NombreAdherants!: number;
  Budget!: number;


  constructor(
    private dashboardService: DashboardService,
    private Abonnementservice: AbonnementService
  ){}

  ngOnInit(): void {
    this.countMoney();
    this.countSports();
    this.countAdherants();
    this.countAbonnements();
  }

//recuprer le budget de cette moi
  countMoney(){
    this.dashboardService.countMoneyForMonth().subscribe((res:any)=>{
      this.Budget = res.data[0];
    })
  }
  countSports(){
    this.dashboardService.countSports().subscribe((res:any)=>{
      this.NombreSports = res.data[0];
    })
  }

  countAdherants(){
    this.dashboardService.countAdherants().subscribe((res:any)=>{
      this.NombreAdherants = res.data[0];
    })
  }
  countAbonnements(){
    return this.dashboardService.countAbonnements().subscribe((res:any)=>{
      this.NombreAbonnements = res.data[0];
    })
  }
}
