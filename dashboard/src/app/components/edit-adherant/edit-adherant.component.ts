import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdherantPost, AdherantService } from 'src/app/services/adherant/adherant.service';

@Component({
  selector: 'app-edit-adherant',
  templateUrl: './edit-adherant.component.html',
  styleUrls: ['./edit-adherant.component.scss']
})
export class EditAdherantComponent implements OnInit{
  adherant!: AdherantPost;
  adherantId!: any;
  message!: string;
  error!: string;

  constructor(
    private activeroute: ActivatedRoute, 
    private AdherantService: AdherantService,
    private route: Router
  ){};

  ngOnInit(){
    this.adherantId = this.activeroute.snapshot.paramMap.get('id');
    
    this.AdherantService.detailAdherant(this.adherantId).subscribe((res: any) => {
      this.adherant = res.data[0];
    })
  }

  updateAdherant(){

    var inputdata = {
      id : this.adherantId,
      cin : this.adherant.cin,
      nom : this.adherant.nom,
      prenom : this.adherant.prenom,
      mail : this.adherant.mail,
      password : this.adherant.password,
      date_naissance : this.adherant.date_naissance,
      adress : this.adherant.adress,
      telephone : this.adherant.telephone,
      ville : this.adherant.ville,
      nom_pere : this.adherant.nom_pere,
      nom_mere : this.adherant.nom_mere,
      tel_parant :this.adherant.tel_parant
      }

      this.AdherantService.UpdateAdherant(inputdata).subscribe({
        next: (res : any) => {
          if(res.data[0] != null){
            this.message="Adherant modifiè"
            setTimeout(() => this.route.navigate(['/adherant']), 1500);
          }else{
            this.error = "Probleme pour modifier l'adherant"
          }
        }
      })
  }
}