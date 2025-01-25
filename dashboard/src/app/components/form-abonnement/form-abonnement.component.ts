import { Component, OnInit } from '@angular/core';
import { AbonnementService } from 'src/app/services/abonnement/abonnement.service';
import { AbonnementSportsService } from 'src/app/services/abonnement_sports/abonnement_sports.service';
import { SportResponse, SportService } from 'src/app/services/sport/sport.service';
import { forkJoin } from 'rxjs';


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

  id_abonnement: any;
  duree!: number;

  prix: number = 0;
  prix_totale: number = 0;
  selectedSports: { id: number, nom: string }[] = [];


  constructor(
    private AbonnementService: AbonnementService,
    private AbonnementsportService: AbonnementSportsService,
    private SportService: SportService
  ){}


  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'nom',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  ngOnInit(): void {
    this.GetSports();
  }

  GetSports() {
    this.SportService.getSports().subscribe((res: any) => {
      this.Sports = res.data;
    });
  }

  onSportChange() {
    this.calculerPrix();
  }

  calculerPrix() {
    if (this.selectedSports.length > 0) {
      const sportIds = this.selectedSports.map(sport => sport.id);

      forkJoin(sportIds.map(id_sport => this.SportService.detailSport(id_sport))).subscribe((responses: any[]) => {
        let totalPrix = 0;
        responses.forEach((res, index) => {
          const prixSport = res.data[0].prix;
          totalPrix += prixSport;
        });
        this.prix = totalPrix;
        if(this.duree === 12){
          this.prix_totale = 1800;
        }else if(this.duree === 6){
          this.prix_totale = 1000
        }else if(this.duree !== null && this.duree !== 0){
          this.prix_totale = totalPrix * this.duree;
        }else{
          this.prix_totale = this.prix;
        }
      });
    } else {
      this.prix = 0;
      this.prix_totale = 0;
    }
  }

  DonnerPrixFinale() {
    this.calculerPrix();
  }

  saveAbonnement(){

    const selectedSportIds = this.selectedSports.map(sport => sport.id);

    const inputData = {
      cin: this.cin,
      date_debut: new Date(),
      date_fin: new Date(),
      prix_totale : this.prix_totale
    };
    inputData.date_fin.setMonth(inputData.date_fin.getMonth() + this.duree);

    this.AbonnementService.SaveAbonnement(inputData).subscribe({
      next: (res: any) => {
        if (res.data != null) {
          this.cin = "";
          this.message = res.message;
          this.error = "";
          this.date_debut = null;
          this.date_fin = null;
          this.id_abonnement = res.data[0].id;
  
          // Agora que temos this.id_abonnement definido, podemos salvar Abonnementsport
          selectedSportIds.forEach((id_sport) => {
            const abonnementSportData = {
              id_abonnement: this.id_abonnement,
              id_sports: id_sport
            };

            this.AbonnementsportService.SaveAbonnementSport(abonnementSportData).subscribe({
              next: (response: any) => {
                // Aqui você pode tratar a resposta de cada salvamento de Abonnementsport
              },
              error: (err: any) => {
                // Aqui você pode tratar o erro de cada salvamento de Abonnementsport
              }
            });
          });
          
          
        } else {
          this.error = res.message;
        }
      },
      error: (err: any) => {
        this.message = "";
        this.error = "Veuillez vérifier que tous les champs sont remplis.";
      }
    });    
  }
}
