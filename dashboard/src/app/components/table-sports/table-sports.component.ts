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
}
