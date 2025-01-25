import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface AdherantResponse{
  id: Number;
  cin: String;
  nom: String;
  prenom: String;
  mail: String;
  date_naissance: Date;
  adress: String;
  telephone: String;
  ville: String;
  nom_pere: String;
  nom_mere: String;
  tel_parant: String;
  active: Number;
};

export interface AdherantPost{
  cin: String;
  nom: String;
  prenom: String;
  mail: String;
  password: String;
  date_naissance: Date;
  adress: String;
  telephone: String;
  ville: String;
  nom_pere: String;
  nom_mere: String;
  tel_parant: String;
};


@Injectable({
  providedIn: 'root'
})

export class AdherantService {
  
  constructor(private Http: HttpClient) { }

  getAdherants() {
    return this.Http.get('http://localhost:8080/adherants');
  }

  chercherAdherant(data: String) {
    return this.Http.get(`http://localhost:8080/adherants/${data}`);
  }

  detailAdherant(AdherantId: number) {
    return this.Http.get(`http://localhost:8080/adherants/${AdherantId}/edit`);
  }
  
  GetAdherantByCIN(CIN: String) {
    return this.Http.get(`http://localhost:8080/adherants/get/${CIN}`);
  }

  SaveAdherant(inputData: object){
    return this.Http.post('http://localhost:8080/adherants', inputData);
  }

  UpdateAdherant(inputData: object){
    return this.Http.put('http://localhost:8080/adherants',inputData);
  }

  deleteAdherant(AdherantId: number) {
    return this.Http.delete(`http://localhost:8080/adherants/${AdherantId}`);
  }

  activerAdherant(adherantId: any) {
    return this.Http.put(`http://localhost:8080/adherants/activer/${adherantId}`, null);
  }
}
