import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SportResponse, SportService } from 'src/app/services/sport/sport.service';

@Component({
  selector: 'app-table-sports',
  templateUrl: './table-sports.component.html',
  styleUrls: ['./table-sports.component.scss']
})
export class TableSportsComponent implements OnInit{
  //usamos essa variavel para gusradar os dados que vamos recuperar no ficheiro sports.json
  sports!: SportResponse[];
  initialsport!: SportResponse[];
  data!: String;
  // Varables pour la pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  nombre: number = 0;

  message!: string;

  
  constructor(
    private http: HttpClient,
    private sportService: SportService,
    private route: Router,
    private activeroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getSports();
  }
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getSports() {
    this.sportService.getSports().subscribe((res: any) => {
      this.sports = res.data;
      this.initialsport = res.data
    })
  }

  chercherSport() {

    if (this.data.trim() === '') {
      this.sports = [...this.initialsport];  // Restaura os dados iniciais
    } else {
      this.sportService.chercherSport(this.data).subscribe((res: any) =>{
        this.sports = res.data;
      })};
    }
  

  deleteSport(event: any, SportId: any){
    if(confirm('Vous etez sur de supprimer cette Sport?'))
      {
        this.sportService.deleteSport(SportId).subscribe((resp:any)=>{
          this.message="Sport supprimé"
          setTimeout(() => window.location.reload(), 1500);
        })
      }
  }

  exportToCSV() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      headers: ["ID", "Nom", "Description", "Prix"]
    };
  
    const data = this.sports.map(sport => ({
      "ID": sport.id,
      "Nom": sport.nom,
      "Nombre maximum de seance par semaine": sport.nmbr_max_seance_semaine,
      "Prix": sport.prix
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
      link.setAttribute("download", "Sports.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  
}
