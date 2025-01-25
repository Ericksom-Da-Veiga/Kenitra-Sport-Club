import { Component } from '@angular/core';
import { SportService } from 'src/app/services/sport/sport.service';

@Component({
  selector: 'app-form-sport',
  templateUrl: './form-sport.component.html',
  styleUrls: ['./form-sport.component.scss']
})
export class FormSportComponent {
  nom!: String;
  nmbr_max_seance_semaine!: Number | null;
  prix!: Number | null;
  message!: String;
  error!: string;

  constructor(private SportService: SportService){}

  saveSport() {
    var inputdata = {
      nom : this.nom,
      nmbr_max_seance_semaine : this.nmbr_max_seance_semaine,
      prix : this.prix
    }

    this.SportService.SaveSport(inputdata).subscribe({
      next:(res: any) => {
          this.nom = "";
          this.nmbr_max_seance_semaine = null;
          this.prix = null;
          this.message = res.message;
          this.error ="";
      },error : (err: any)=>{
        this.message = "";
        this.error = "Voulez bien verifier si tous les champs sont remplis";
      }
    })
  }

}
