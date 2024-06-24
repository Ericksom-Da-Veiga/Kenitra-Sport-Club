import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserPost, UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-settings',
  templateUrl: './edit-settings.component.html',
  styleUrls: ['./edit-settings.component.scss']
})
export class EditSettingsComponent implements OnInit{

  User!: UserPost;
  userId: any;
  password!: string;
  role!: String

  error!: string;
  message!: string;

  constructor(
    private activeroute: ActivatedRoute,
    private service: UserService,
    private route: Router
  ){}

  ngOnInit(){
    this.userId = this.activeroute.snapshot.paramMap.get('id');

    this.service.detailUser(this.userId).subscribe((res: any)=>{
      this.User = res.data[0];
    })
  }

  onRoleChange({ target }: { target: EventTarget | null }): void {
    const selectElement = target as HTMLSelectElement;
    if (selectElement) {
      this.role = selectElement.value;
    }   
  }

  UpdateUser(){
    var inputdata = {
      id: this.userId,
      cin : this.User.cin,
      nom : this.User.nom,
      prenom : this.User.prenom,
      mail : this.User.mail,
      password : this.password,
      role : this.role,
      telephone : this.User.telephone,
      }

      this.service.UpdateUser(inputdata).subscribe({
        next: (res: any)=>{
          this.message = res.message;
          setTimeout(()=> this.route.navigate(['/settings']), 1500);
        },error:(err:any)=> {
          this.error = "Nous avons trouvez un probleme, essayer plus tard";
          console.log(err);
          
        },
      })
  }

}
