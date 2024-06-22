import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface payementResponse{
  id: number,
  cin_adherant: String;
  nom: string;
  prenom: string;
  quant_recu: number;
  date_payement:Date;
  id_abonnement: String;
  rendu: number;
  prix: number;
}

export interface payementsPost{
    date_payement: Date;
    id_abonnement:number;
    quant_recu: number;
    cin_adherant: string;
}

@Injectable({
  providedIn: 'root'
})

export class PayementService {
  payements_list!: payementResponse[];
  constructor(private Http: HttpClient) { }

  getListPayements(){
    return this.Http.get('http://localhost:8080/payements');
    };

  detailPayement(PayementId: number) {
    return this.Http.get(`http://localhost:8080/payements/${PayementId}/edit`);
  };

  SavePayement(inputData: object){
    return this.Http.post('http://localhost:8080/payements', inputData);
  };

  deletePayements(PayementId: number) {
    return this.Http.delete(`http://localhost:8080/payements/${PayementId}`);
  }
}
