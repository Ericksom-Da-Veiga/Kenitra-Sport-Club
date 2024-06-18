import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbonnementPost, AbonnementResponse, AbonnementService } from 'src/app/services/abonnement/abonnement.service';
import { AdherantService } from 'src/app/services/adherant/adherant.service';


@Component({
  selector: 'app-edit-abonnement',
  templateUrl: './edit-abonnement.component.html',
  styleUrls: ['./edit-abonnement.component.scss']
})
export class EditAbonnementComponent implements OnInit{
  Abonnement!: AbonnementPost;
  abonnementId: any;
  AbonnementResponse!: AbonnementResponse;
  duree_abonnement!: Date;

  constructor(
    private activeroute: ActivatedRoute, 
    private AbonnementService: AbonnementService,
    private AdherantService: AdherantService,
    private route: Router
  ){}

  ngOnInit(){
    this.abonnementId = this.activeroute.snapshot.paramMap.get('id');
    
    this.AbonnementService.detailAbonnement(this.abonnementId).subscribe((res: any) => {
      this.AbonnementResponse = res.data[0];

      this.AdherantService.detailAdherant(this.AbonnementResponse.id_adherant).subscribe((res:any)=>{
        this.AbonnementResponse.cin = res.data[0].cin;
        this.AbonnementResponse.nom = res.data[0].nom;
        this.AbonnementResponse.prenom = res.data[0].prenom;        
      })      
    })
  }
  updateAbonnement() {  

    var inputData = {
      id: this.abonnementId,
      date_dbut: this.AbonnementResponse.date_debut,
      date_fin: this.AbonnementResponse.date_fin,
      prix_totale: this.AbonnementResponse.prix_totale
    }

    this.AbonnementService.UpdateAbonnement(inputData).subscribe({
      next: (res: any) =>{
        this.route.navigate(['/abonnement']);
      }
    })
  }
}