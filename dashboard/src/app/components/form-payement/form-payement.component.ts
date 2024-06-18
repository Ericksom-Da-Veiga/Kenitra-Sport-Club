import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbonnementService } from 'src/app/services/abonnement/abonnement.service';
import { AdherantService } from 'src/app/services/adherant/adherant.service';
import { PayementService } from 'src/app/services/payement/payement.service';

@Component({
  selector: 'app-form-payement',
  templateUrl: './form-payement.component.html',
  styleUrls: ['./form-payement.component.scss']
})
export class FormPayementComponent {
  prix!: number | null;
  cin!: string;
  rendu: number = 0;
  recu!: number;
  id_abonnement!: number;
  message!: string;
  erreur!: string;
  nom!: string;

  constructor(
    private abonnementservice: AbonnementService,
    private payementservice: PayementService,
    private adherantservice: AdherantService
  ){}

  chercherAbonnemnt() {
    if(this.cin.trim() === ''){
      this.prix = null;
    }else {
      this.abonnementservice.TrouverAbonnementByCIN(this.cin).subscribe((res: any)=>{
        if(res.data != null){
          this.prix = res.data[0].prix_totale;
          this.id_abonnement = res.data[0].id;
          this.adherantservice.GetAdherantByCIN(this.cin).subscribe((res:any)=>{
            this.nom = res.data[0].nom;                    
          })
        }
      });
    }
  }

  CalculerRendu(){
    if(this.recu === null){
      this.rendu = 0;
    }else if(this.prix) {
      this.rendu = this.recu - this.prix;
    }
  }

  SavePayement(){
    var inputData = {
      date_payement: new Date(),
      id_abonnement: this.id_abonnement,
      quant_recu: this.recu,
      cin_adherant: this.cin,
      rendu: this.rendu
    } 
    if(this.prix && this.recu>= this.prix){
      this.payementservice.SavePayement(inputData).subscribe({
        next:(res:any) =>{
          if(res.data != null){
            this.message = res.message;
            this.erreur = "";
            this.cin = ""
            this.prix = null
          }else{
            this.erreur = res.message;
            this.message = "";
          }
        },error:(err:any)=>{
          this.message = "";
          this.erreur = "un erreur s'est produit au niveau du serveur, voulez essayer plus tard";
        }
      })
    }else if(this.prix && this.recu< this.prix){
      this.message="";
      this.erreur="Le montant saisi n'est pas sufisant";
    }else{
      this.message="";
      this.erreur="Un erreur s'est produit, voulez verifier les informaction ou voulez essayer plus tard";
    }  
  }
}