import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface AbonnementResponse{
  date_debut : Date;
  date_fin : Date;
  id: number;
  id_adherant: number;
  prix_totale: number;
  cin: String;
  nom: String;
  prenom: string;
  typeAbonnement: String;
  duree: number;
  active: number;
  id_sport: number[];
  nom_Sport: String[];
}


export interface AbonnementPost{
  cin : String;
  id_adherant : number;
  date_debut : Date;
  date_fin : Date;
  prix_totale :number;
}

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {

  constructor(private Http: HttpClient) { }

  getAbonnements(){
    return this.Http.get('http://localhost:8080/abonnements');
  }

  detailAbonnement(AbonnementID: number) {
    return this.Http.get(`http://localhost:8080/abonnements/${AbonnementID}/edit`);
  }

  // chercher un abonnement avec le nom ou prenom ou CIN du adherant
  chercherAbonnement(data: String) {
    return this.Http.get(`http://localhost:8080/abonnements/${data}`);
  }
  TrouverAbonnementByCIN(cin: String) {
    return this.Http.get(`http://localhost:8080/abonnements/find/${cin}`);
  }

  SaveAbonnement(inputData: object){
    return this.Http.post('http://localhost:8080/abonnements', inputData);
  }
  UpdateAbonnement(inputData: object){
    return this.Http.put('http://localhost:8080/abonnements',inputData);
  }

  deleteAbonnement(AbonnementID: number) {
    return this.Http.delete(`http://localhost:8080/abonnements/${AbonnementID}`);
  }

  activerAbonnement(AbonnementID: any) {
    return this.Http.put(`http://localhost:8080/abonnements/activer/${AbonnementID}`, null);
  }
}
