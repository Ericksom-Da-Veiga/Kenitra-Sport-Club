import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface CoachResponse{
  id: number;
  cin: String;
  nom: String;
  prenom: String;
  mail: String;
  password: String;
  date_entree: Date|null;
  adress: String;
  telephone: String;
  idsport: number;
  nom_sport: string
}
export interface CoachPost{
  cin: String;
  nom: String;
  prenom: String;
  mail: String;
  password: String;
  date_entree: Date|null;
  adress: String;
  telephone: String;
  idsport: number;
}

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  constructor(private Http: HttpClient) { }

  SaveCoach(inputdata: CoachPost) {
    return this.Http.post('http://localhost:8080/coach', inputdata);
  }
  
  getCoachs() {
    return this.Http.get('http://localhost:8080/coach');
  }

  //pour faire une recehrche par nom ou par cin
  chercherCoachs(data: String) {
    return this.Http.get(`http://localhost:8080/coach/${data}`);
  }
  //pour checher le coach en utilisant l'id
  detailCoachs(CoachId: Number) {
    return this.Http.get(`http://localhost:8080/coach/${CoachId}/edit`);
  }  

  UpdateCoachs(inputData: object){
    return this.Http.put('http://localhost:8080/coach',inputData);
  }

  deleteCoachs(CoachId: number) {
    return this.Http.delete(`http://localhost:8080/coach/${CoachId}`);
  }
  
}
