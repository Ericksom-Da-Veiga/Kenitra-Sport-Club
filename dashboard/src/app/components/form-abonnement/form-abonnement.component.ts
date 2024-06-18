import { Component, OnInit } from '@angular/core';
import { AbonnementService } from 'src/app/services/abonnement/abonnement.service';
import { AbonnementSportsService } from 'src/app/services/abonnement_sports/abonnement_sports.service';
import { SportResponse, SportService } from 'src/app/services/sport/sport.service';
import { AdherantService } from 'src/app/services/adherant/adherant.service';


@Component({
  selector: 'app-form-abonnement',
  templateUrl: './form-abonnement.component.html',
  styleUrls: ['./form-abonnement.component.scss']
})
export class FormAbonnementComponent implements OnInit{

  Sports!: SportResponse[];
  message!: String;
  error!: string;
  id_sport!: number;

  cin!: string
  List_sports!: number[] | null;
  date_debut!: Date | null;
  date_fin!: Date | null;
  prix_totale!: number | null;

  id_abonnement: any;

  constructor(
    private AbonnementService: AbonnementService,
    private AbonnementsportService: AbonnementSportsService,
    private AdherantService: AdherantService,
    private SportService: SportService
  ){}

  ngOnInit(): void {
    this.GetSports();
  }

  GetSports(){
    this.SportService.getSports().subscribe((res:any)=>{
      this.Sports = res.data      
    })
  }

  onSportChange({ target }: { target: EventTarget | null }): void {
    const selectElement = target as HTMLSelectElement;
    if (selectElement) {
      this.id_sport = +selectElement.value;
    }
  }

  saveAbonnement(){

    var inputData ={
      cin: this.cin,
      date_debut: this.date_debut,
      date_fin: this.date_fin,
      prix_totale : this.prix_totale
      };

    this.AbonnementService.SaveAbonnement(inputData).subscribe({
      next: (res: any) =>{
        if(res.data != null){
          this.cin = "",
          this.message = res.message
          this.error = "",
          this.date_debut = null,
          this.date_fin = null,
          this.prix_totale = null
          this.id_abonnement = res.data[0].id;
        }else{
          this.error = res.message
        }
        
      },
      error:(err: any) => {
        this.message = "";
        this.error = "Voulez bien verifier si tous les champs sont remplis";
      }
    })

    var inputAbonnementSports={
      id_abonnement: this.id_abonnement,
      id_sports: this.id_sport
    }

    this.AbonnementsportService.SaveAbonnementSport(inputAbonnementSports).subscribe({
      next: (res: any)=>{
        console.log(res);
      },error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
}
