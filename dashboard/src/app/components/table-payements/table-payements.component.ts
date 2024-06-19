import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PayementService, payementResponse } from 'src/app/services/payement/payement.service';
import { AdherantService } from 'src/app/services/adherant/adherant.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-table-payements',
  templateUrl: './table-payements.component.html',
  styleUrls: ['./table-payements.component.scss']
})
export class TablePayementsComponent implements OnInit {

  payement_list: payementResponse[] = [];
  filteredPayementList: payementResponse[] = [];
  startDate: string = '';
  endDate: string = '';

  // Varables pour la pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  nombre: number = 0;
  message!: string;

  constructor(
    private payementService: PayementService,
    private adherantService: AdherantService
  ) {}

  ngOnInit(): void {
    this.getPayements();
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getPayements() {
    this.payementService.getListPayements().subscribe((res: any) => {
      this.payement_list = res.data;
      const payementObservables = this.payement_list.map((payement: payementResponse) => 
        this.adherantService.GetAdherantByCIN(payement.cin_adherant).pipe(
          map((res: any) => {
            payement.nom = res.data[0].nom;
            payement.prenom = res.data[0].prenom;
            return payement;
          })
        )
      );

      forkJoin(payementObservables).subscribe(updatedPayements => {
        this.payement_list = updatedPayements;
        this.filteredPayementList = this.payement_list;
      });
    });
  }

  applyFilter() {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      end.setHours(23, 59, 59, 999); // Ajusta a data de fim para incluir todo o dia

      this.filteredPayementList = this.payement_list.filter((payement: payementResponse) => {
        const payementDate = new Date(payement.date_payement);
        return payementDate >= start && payementDate <= end;
      });
    }
  }

  clearFilter() {
    this.startDate = '';
    this.endDate = '';
    this.filteredPayementList = this.payement_list;
  }

  sort(property: keyof payementResponse) {
    this.filteredPayementList.sort((a, b) => {
      if (a[property] < b[property]) {
        return -1;
      } else if (a[property] > b[property]) {
        return 1;
      }
      return 0;
    });
  }

  deletePayement($event: MouseEvent,id: number) {
    if(confirm('Vous etez sur de supprimer cette adherant?'))
      {
        this.payementService.deletePayements(id).subscribe((resp:any)=>{
          this.message = "Payement supprimè"
          setTimeout(() => window.location.reload(), 2000);
        })
      }
    }

    exportToCSV() {
      const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true, 
        headers: ["Date de Paiement", "CIN", "Nom", "Prénom", "Montant Reçu", "Rendu"]
      };
    
      const data = this.filteredPayementList.map(payement => ({
        "Date de Paiement": payement.date_payement,
        "CIN": payement.cin_adherant,
        "Nom": payement.nom,
        "Prénom": payement.prenom,
        "Montant Reçu": payement.quant_recu,
        "Rendu": payement.rendu
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
        link.setAttribute("download", "payements.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
}
