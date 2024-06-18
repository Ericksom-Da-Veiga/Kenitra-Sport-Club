import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AbonnementSportsService {

  constructor(private Http: HttpClient) { }

  getAbonnementSport() {
    return this.Http.get('http://localhost:8080/abonnement_sports');
  }

  detailAbonnementSportt(Id: number) {
    return this.Http.get(`http://localhost:8080/abonnement_sports/${Id}/edit`);
  } 
//   lister les sports do abonnement donne
  ListerSports(IdAbonnement: number) {
    return this.Http.get(`http://localhost:8080/abonnement_sports/${IdAbonnement}`);
  } 

  SaveAbonnementSport(inputData: object){
    return this.Http.post('http://localhost:8080/abonnement_sports', inputData);
  }

  UpdateAbonnementSportt(inputData: object){
    return this.Http.put('http://localhost:8080/abonnement_sports',inputData);
  }

  deleteAbonnementSport(Id: number) {
    return this.Http.delete(`http://localhost:8080/abonnement_sports/${Id}`);
  }

}
