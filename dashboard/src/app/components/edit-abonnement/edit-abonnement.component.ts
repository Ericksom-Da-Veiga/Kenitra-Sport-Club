import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbonnementPost, AbonnementResponse, AbonnementService } from 'src/app/services/abonnement/abonnement.service';
import { AdherantService } from 'src/app/services/adherant/adherant.service';
import { SportResponse, SportService } from 'src/app/services/sport/sport.service';
import { forkJoin } from 'rxjs';
import { AbonnementSportsService } from 'src/app/services/abonnement_sports/abonnement_sports.service';

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
  message!: string;
  error!: string;
  List_sports!: number[] | null;


  prix: number = 0;
  prix_totale: number = 0;
  selectedSports: { id: number, nom: string }[] = [];
  duree!: number;
  Sports!: SportResponse[];
  ListAbonnemntSport!: any[];


  constructor(
    private activeroute: ActivatedRoute, 
    private AbonnementService: AbonnementService,
    private AdherantService: AdherantService,
    private SportService: SportService,
    private AbonnementsportService: AbonnementSportsService,
    private route: Router
  ){}

  ngOnInit(){
    this.abonnementId = this.activeroute.snapshot.paramMap.get('id');
    this.GetSports();
    this.getAbonnement(this.abonnementId);
    this.ListerIdAbonnemntSports(this.abonnementId);
  };

   dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'nom',
    selectAllText: 'Tout Selectionner',
    unSelectAllText: 'Tout effacer',
    itemsShowLimit: 9,
    allowSearchFilter: false
   };

   //recuperer les AbonnementsSports en utilisant l'id Abonnement
   ListerIdAbonnemntSports(idAbonnement: number){
    this.AbonnementsportService.ListerSports(idAbonnement).subscribe((res:any)=>{
      this.ListAbonnemntSport = res.data;     
    })
   }

  GetSports() {
    this.SportService.getSports().subscribe((res: any)=>{
      this.Sports = res.data      
    })
  };

  getAbonnement(id_abonnement: number){
    this.AbonnementService.detailAbonnement(id_abonnement).subscribe((res: any) => {
      this.AbonnementResponse = res.data[0];      
    });
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
        if(this.duree !== null && this.duree !== 0 && this.duree !== 12 ){
          this.prix_totale = totalPrix * this.duree;
        }else if(this.duree === 12){
          this.prix_totale = 1800;
        }else{
          this.prix_totale = this.prix;
        }
      });
    } else {
      this.prix = 0;
      this.prix_totale = 0;
    }
  };


  updateAbonnement() {  
    const selectedSportIds = this.selectedSports.map(sport => sport.id);

    const inputData = {
      id: this.abonnementId,
      date_debut: new Date(),
      date_fin: new Date(),
      prix_totale : this.prix_totale
    };
    inputData.date_fin.setMonth(inputData.date_fin.getMonth() + this.duree);

    this.AbonnementService.UpdateAbonnement(inputData).subscribe({
      next: (res :any)=>{
        if(res.data[0] != null){
          // this.message="Abonnemnent modifiè"
          // setTimeout(() => this.route.navigate(['/adherant']), 1500);

          //On vas suppimer tous les registre de AbonnemntsSport que existe pour cette Abonnemnt
          this.ListAbonnemntSport.forEach((data)=>{
            this.AbonnementsportService.deleteAbonnementSport(data.id).subscribe((res:any)=>{});
          })

          // Et apres on vas faire des nouveau enregistrement sur Abonnementsport
          selectedSportIds.forEach((id_sport) => {
            const abonnementSportData = {
              id_abonnement: this.abonnementId,
              id_sports: id_sport
            };
            this.AbonnementsportService.SaveAbonnementSport(abonnementSportData).subscribe({
              next: (response: any) => {
                this.message="Adherant modifiè"
                setTimeout(() => this.route.navigate(['/abonnement']), 1500);
              }, error: (err: any)=>{
                this.error = "erro ao salvar abonnementSport"
              }
            });
          });
        }else{
          this.error = "Probleme pour modifier l'adherant"
        }
      },error: (err: any)=>{
        this.message = "";
        this.error = "Un erreur s'est produit au niveau du serveur, voullez essayer plus tard";
      }
    })
   
  };
}