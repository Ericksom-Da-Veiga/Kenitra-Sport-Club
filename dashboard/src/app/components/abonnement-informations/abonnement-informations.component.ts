import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbonnementResponse, AbonnementService } from 'src/app/services/abonnement/abonnement.service';
import { AbonnementSportsService } from 'src/app/services/abonnement_sports/abonnement_sports.service';
import { AdherantService } from 'src/app/services/adherant/adherant.service';
import { SportResponse, SportService, abonnement_sports } from 'src/app/services/sport/sport.service';
@Component({
  selector: 'app-abonnement-informations',
  templateUrl: './abonnement-informations.component.html',
  styleUrls: ['./abonnement-informations.component.scss']
})
export class AbonnementInformationsComponent implements OnInit{

  sports!: abonnement_sports[];
  abonnementId: any;

  constructor(
    private activeroute: ActivatedRoute, 
    private AbonnementService: AbonnementService,
    private AdherantService: AdherantService,
    private SportService: SportService,
    private route: Router,
    private abonnementSportsService: AbonnementSportsService,
  ){}

  ngOnInit(){
    this.abonnementId = this.activeroute.snapshot.paramMap.get('id');
    this.abonnementSportsService.ListerSports(this.abonnementId).subscribe((res: any)=>{
      this.sports = res.data;
      
      if(this.sports){
       this.sports.forEach(sport =>{
        this.SportService.detailSport(sport.id_sports).subscribe((response: any) => {
          sport.nom = response.data[0].nom;
          sport.nmbr_max_seance_semaine = response.data[0].nmbr_max_seance_semaine;
        }
      )
       })
      }
      
    })
  }


}
