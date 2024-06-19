import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbonnementResponse, AbonnementService } from 'src/app/services/abonnement/abonnement.service';
import { AdherantService } from 'src/app/services/adherant/adherant.service';
import { differenceInDays} from 'date-fns';
import { AbonnementSportsService } from 'src/app/services/abonnement_sports/abonnement_sports.service';
import { SportService } from 'src/app/services/sport/sport.service';

interface Sport {
  id_sports: number;
}
interface NomSport {
  nom: String
}

@Component({
  selector: 'app-table-abonnement',
  templateUrl: './table-abonnement.component.html',
  styleUrls: ['./table-abonnement.component.scss']
})
export class TableAbonnementComponent implements OnInit {

  Abonnements!: AbonnementResponse[];
  duree_abonnement!: Date;
  data: any;
  message!: string;

  Abonnement!: AbonnementResponse;
  
  initialAbonnement!: AbonnementResponse[]; //pour sauvegarder les abonnements recuperer au debut
// Varables pour la pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  nombre: number = 0;
  

  constructor(
    private http: HttpClient,
    private Abonnementservice: AbonnementService,
    private AdherantService: AdherantService,
    private Abonnement_sportService: AbonnementSportsService,
    private SportService: SportService,
    private route: Router,
    private activeroute: ActivatedRoute, 
  ){}

  ngOnInit(): void {
      this.getAbonnements();
  }
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getAbonnements(){
    this.Abonnementservice.getAbonnements().subscribe((res: any)=>{
      this.Abonnements = res.data;            
     
      this.Abonnements.forEach(abonnement =>{
        this.AdherantService.detailAdherant(abonnement.id_adherant).subscribe((res:any)=>{
          abonnement.cin = res.data[0].cin;
          abonnement.nom = res.data[0].nom;
          abonnement.prenom = res.data[0].prenom;
          //recuperer la dure du abonnement
          abonnement.duree = differenceInDays(abonnement.date_fin, abonnement.date_debut);
          //definir le type d'abonnement
          if (abonnement.duree === 365) {
            abonnement.typeAbonnement = "Anuel";
          } else if (abonnement.duree > 80 && abonnement.duree <= 100) {
            abonnement.typeAbonnement = "Trimensuel";
          } else {
            abonnement.typeAbonnement = "Mensuel"
          }
        })
      })
      this.initialAbonnement = this.Abonnements;
    })
  }

  chercherAbonnement() {
    if(this.data.trim() === ''){
      this.Abonnements = [...this.initialAbonnement];
    }else {
      this.Abonnementservice.chercherAbonnement(this.data).subscribe((res: any)=>{
        this.Abonnements = res.data;        
        
        this.Abonnements.forEach(abonnement =>{
          this.AdherantService.detailAdherant(abonnement.id_adherant).subscribe((res:any)=>{
            abonnement.cin = res.data[0].cin;
            abonnement.nom = res.data[0].nom;
            abonnement.prenom = res.data[0].prenom;
            //recuperer la dure du abonnement
            abonnement.duree = differenceInDays(abonnement.date_fin, abonnement.date_debut);
            //definir le type d'abonnement
            if (abonnement.duree === 365) {
              abonnement.typeAbonnement = "Anuel";
            } else if (abonnement.duree > 80 && abonnement.duree <= 100) {
              abonnement.typeAbonnement = "Trimensuel";
            } else {
              abonnement.typeAbonnement = "Mensuel"
            }
          })
        });
      })
    }
  }

  deleteAbonnement($event: MouseEvent,AbonnementId: number) {
    if(confirm('Vous etez sur de supprimer cette adherant?'))
      {
        this.Abonnementservice.deleteAbonnement(AbonnementId).subscribe((resp:any)=>{
          this.message="Abonnement supprimé"
          setTimeout(() => window.location.reload(), 1500);
        })
      }
    }

  activerAbonnement($event: MouseEvent,AbonnementId: number) {
    this.Abonnementservice.activerAbonnement(AbonnementId).subscribe((resp:any)=>{
      this.message="Abonnement active"
      setTimeout(() => window.location.reload(), 1500);
    })
  }

  
  
  OpenSports($event: MouseEvent, AbonnementId: number) {
    this.Abonnementservice.detailAbonnement(AbonnementId).subscribe((res: any)=>{
      this.Abonnement = res.data[0] 
    })

    //pour recuperer les id du sports
    this.Abonnement_sportService.ListerSports(AbonnementId).subscribe((res:any)=>{
        if (Array.isArray(res.data) && res.data.length > 0) {
          // Cria um novo campo no abonnement para armazenar todos os id_sports
          this.Abonnement.id_sport = res.data.map((sport: Sport) => sport.id_sports);
        } else {
          // Se res.data não é um array ou está vazio, define id_sports como um array vazio
          this.Abonnement.id_sport = res.data.id_sports;
        }
    })

    this.Abonnement.id_sport.forEach(id =>{

        this.SportService.detailSport(id).subscribe((res:any)=>{
          if (Array.isArray(res.data) && res.data.length > 0){
            this.Abonnement.nom_Sport = res.data.map((sport: NomSport) => sport.nom);          
          }else{
            this.Abonnement.nom_Sport = res.data.nom;
          }
        })
      })
      
  }

  exportToCSV() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      headers: ["ID", "CIN", "Nom", "Prénom", "Date de Début", "Date de Fin", "Durée (jours)", "Type d'Abonnement"]
    };
  
    const data = this.Abonnements.map(abonnement => ({
      "ID": abonnement.id,
      "CIN": abonnement.cin,
      "Nom": abonnement.nom,
      "Prénom": abonnement.prenom,
      "Date de Début": abonnement.date_debut,
      "Date de Fin": abonnement.date_fin,
      "Durée (jours)": abonnement.duree,
      "Type d'Abonnement": abonnement.typeAbonnement
    }));
  
    // Criando o conteúdo CSV
    let csv = '\ufeff'; // BOM para garantir que o Excel abra corretamente o arquivo UTF-8
    
    // Adicionando cabeçalhos
    csv += options.headers.join(options.fieldSeparator) + '\n';
  
    // Adicionando linhas de dados
    data.forEach(item => {
      // Type assertion para garantir que `item` corresponde ao formato esperado
      const row = options.headers.map(field => item[field as keyof typeof item]).join(options.fieldSeparator);
      csv += row + '\n';
    });
  
    // Criando um elemento 'a' invisível para baixar o arquivo
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "Abonnements.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  
}