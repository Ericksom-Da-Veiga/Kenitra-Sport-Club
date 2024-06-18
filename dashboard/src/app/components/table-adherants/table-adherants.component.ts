import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdherantResponse, AdherantService } from 'src/app/services/adherant/adherant.service';

@Component({
  selector: 'app-table-adherants',
  templateUrl: './table-adherants.component.html',
  styleUrls: ['./table-adherants.component.scss']
})
export class TableAdherantsComponent implements OnInit{

  Adherants!: AdherantResponse[];
  data!: string;
  initialAdherants!: AdherantResponse[]; //pour sauvegarder les adherants recuperer au debut
// Varables pour la pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  nombre: number = 0;

  error!: string;
  message!: string;

  constructor(
    private http: HttpClient, 
    private AdherantService: AdherantService,
    private route: Router,
    private activeroute: ActivatedRoute, 
  ) {}

  ngOnInit(): void {
    this.getAdherants()
  }
  
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getAdherants() {
    this.AdherantService.getAdherants().subscribe((res: any) => {
      if(res.data != null){
      this.Adherants = res.data;
      this.initialAdherants = res.data
      }else {
        this.error = "Aucune adherant touver"
      }
    })
  }

  chercherAdherant() {

    if (this.data.trim() === '') {
      this.Adherants = [...this.initialAdherants];  // Restaura os dados iniciais
    } else {
      this.AdherantService.chercherAdherant(this.data).subscribe((res: any) =>{
          this.Adherants = res.data;
          this.initialAdherants = res.data
      })}; 
    }
  

  deleteAdherant(event: any, adherantId: any){
    if(confirm('Vous etez sur de supprimer cette adherant?'))
      {
        this.AdherantService.deleteAdherant(adherantId).subscribe((resp:any)=>{
          this.message="Adherant supprimé"
          setTimeout(() => window.location.reload(), 2000);
        })
      }
  }
  ActiverAdherant($event: MouseEvent,adherantId: any) {
    this.AdherantService.activerAdherant(adherantId).subscribe((resp:any)=>{
      this.message="Adherant active"
      setTimeout(() => window.location.reload(), 2000);
    })
    }
}