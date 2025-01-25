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
      this.Adherants = res.data;
      this.initialAdherants = res.data
    })
  }

  chercherAdherant() {
    if (this.data.trim() === '') {
      this.Adherants = [...this.initialAdherants];  // Restaura os dados iniciais
    } else {
      this.AdherantService.chercherAdherant(this.data).subscribe((res: any) =>{
          this.Adherants = res.data;
      })}; 
    }
  

  deleteAdherant(event: any, adherantId: any){
    if(confirm('Vous etez sur de supprimer cette adherant?'))
      {
        this.AdherantService.deleteAdherant(adherantId).subscribe((resp:any)=>{
          this.message="Adherant supprimé"
          setTimeout(() => window.location.reload(), 1500);
        })
      }
  }
  ActiverAdherant($event: MouseEvent,adherantId: any) {
    this.AdherantService.activerAdherant(adherantId).subscribe((resp:any)=>{
      this.message="Adherant active"
      setTimeout(() => window.location.reload(), 1500);
    })
    }

    exportToCSV() {
      const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        headers: ["ID", "CIN", "Nom", "Prénom", "Date de Naissance", "Adresse", "Email", "Téléphone"]
      };
    
      const data = this.Adherants.map(adherant => ({
        "ID": adherant.id,
        "CIN": adherant.cin,
        "Nom": adherant.nom,
        "Prénom": adherant.prenom,
        "Date de Naissance": adherant.date_naissance,
        "Adresse": adherant.adress,
        "Email": adherant.mail,
        "Téléphone": adherant.telephone
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
        link.setAttribute("download", "Adherants.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
    
}