import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachResponse, CoachService } from 'src/app/services/coach/coach.service';
import { SportService } from 'src/app/services/sport/sport.service';
import { UserResponse, UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-table-admin',
  templateUrl: './table-admin.component.html',
  styleUrls: ['./table-admin.component.scss']
})
export class TableAdminComponent implements OnInit {

  Users!: any[];
  data!: string;
  InitialUsers!: UserResponse[];

  currentPage: number = 1;
  itemsPerPage: number = 10;
  nombre: number = 0;

  message!: string;
  user_list!: UserResponse[];

  constructor(
    private http: HttpClient,
    private service: UserService,
    private route: Router,
    private activateroute: ActivatedRoute,
  ){}

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  ngOnInit(): void {
   this.GetUsers();
  }

  GetUsers(){
    this.service.getUsers().subscribe((res: any)=>{
      this.Users = res.data;
      this.InitialUsers = res.data;
      console.log(res.data);
      
    })
  }

  ChercherUser(){
    if (this.data.trim() === '') {
      this.Users = [...this.Users];  // Restaura os dados iniciais
    } else {
      this.service.chercherUser(this.data).subscribe((res: any) =>{
          this.Users = res.data;
      })};
  }

  deleteUser(event: any, Userid: any){
    if(confirm('Vous etez sur de supprimer cette adherant?'))
      {
        this.service.deleteUser(Userid).subscribe((resp:any)=>{
          this.message="Utilisateur supprimé"
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
      headers: ["ID", "CIN", "Nom", "Prénom", "Telephone", "E-mail", "Role"]
    };
  
    const data = this.user_list.map(user => ({
      "ID": user.id,
      "CIN": user.cin,
      "Nom": user.nom,
      "Prénom": user.prenom,
      "Telephone": user.telephone,
      "Email": user.mail,
      "role":user.role
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
