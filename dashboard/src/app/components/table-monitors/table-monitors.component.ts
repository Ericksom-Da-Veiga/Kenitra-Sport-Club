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
}
