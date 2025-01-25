import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-form-settings',
  templateUrl: './form-settings.component.html',
  styleUrls: ['./form-settings.component.scss']
})
export class FormSettingsComponent {

  message!: String;
  error!: string;
  cin!: String;
  nom!: String;
  prenom!: String;
  mail!: String;
  password!: String;
  telephone!: String;
  role!: string;

  constructor(
    private service: UserService
  ){}


  onRoleChange({ target }: { target: EventTarget | null }): void {
    const selectElement = target as HTMLSelectElement;
    if (selectElement) {
      this.role = selectElement.value;
    }   
  }

  saveUser() {
   var inputData = {
    cin: this.cin,
    nom: this.nom,
    prenom: this.prenom,
    mail: this.mail,
    password: this.password,
    telephone: this.telephone,
    role: this.role
   }

   console.log(inputData);
   
   this.service.SaveUser(inputData).subscribe({
    next: (res: any)=>{
      if(res.data != null){
        this.error = "";
        this.message = res.message;
        this.cin ="";
        this.nom = "";
        this.prenom = "";
        this.mail = "";
        this.password = "";
        this.telephone = "";
      }else{
        this.error = res.message;
      }
    },error:(err: any) => {
      console.log(err.error, 'errors');
      this.message = "";
      this.error = "Voulez bien verifier si tous les champs sont remplis";
    },
   })
   
  }
}
