import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachResponse, CoachService } from 'src/app/services/coach/coach.service';
import { SportService } from 'src/app/services/sport/sport.service';

@Component({
  selector: 'app-table-monitors',
  templateUrl: './table-monitors.component.html',
  styleUrls: ['./table-monitors.component.scss']
})
export class TableMonitorsComponent {
  monitor_list!: CoachResponse[];
  initialManitors!: any[];
  data!: String;
  message!: string;
  //variable pour la pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private http: HttpClient, 
    private CoachService: CoachService,
    private route: Router,
    private activeroute: ActivatedRoute,
    private SportService: SportService
  ){}

  ngOnInit(): void {
    this.getCoach();
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getCoach() {
    this.CoachService.getCoachs().subscribe((res: any) => {
      this.monitor_list = res.data;
      this.initialManitors = res.data  
      
      this.monitor_list.forEach( monitor=> {
        this.SportService.detailSport(monitor.idsport).subscribe((res:any)=>{
          monitor.nom_sport = res.data[0].nom;          
        })
      });
    })
  }

  chercherCoach() {
    if (this.data.trim() === '') {
      this.monitor_list = [...this.initialManitors];  // Restaura os dados iniciais
    } else {
      this.CoachService.chercherCoachs(this.data).subscribe((res: any) =>{
        this.monitor_list = res.data;              
      })};
    }
  

  deleteCoach(event: any, CoachID: any){
    if(confirm('Vous etez sur de supprimer cette Coach?'))
      {
        this.CoachService.deleteCoachs(CoachID).subscribe((resp:any)=>{
          setTimeout(()=>window.location.reload(), 1500);
          this.message = "Coach supprimè";
        })
      }
  }

  exportToCSV() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      headers: ["ID", "CIN", "Nom", "Prénom", "ID Sport", "Nom Sport"]
    };
  
    const data = this.monitor_list.map(coach => ({
      "ID": coach.id,
      "CIN": coach.cin,
      "Nom": coach.nom,
      "Prénom": coach.prenom,
      "ID Sport": coach.idsport,
      "Nom Sport": coach.nom_sport
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
      link.setAttribute("download", "Monitors.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  
}
