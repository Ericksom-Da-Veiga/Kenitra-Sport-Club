import { Component, OnInit } from '@angular/core';
import { CoachService } from 'src/app/services/coach/coach.service';
import { SportResponse, SportService } from 'src/app/services/sport/sport.service';

@Component({
  selector: 'app-form-monitor',
  templateUrl: './form-monitor.component.html',
  styleUrls: ['./form-monitor.component.scss']
})


export class FormMonitorComponent implements OnInit {
  message!: String;
  error!: string;
  cin!: String;
  nom!: String;
  prenom!: String;
  mail!: String;
  password!: String;
  date_entree!: Date| null;
  adress!: String;
  telephone!: String;
  idsport!: number;

  sports!: SportResponse[];

  constructor(private CoachService: CoachService, private SportService: SportService){};

  ngOnInit() : void {
    this.getSports();
  }

  onSportChange({ target }: { target: EventTarget | null }): void {
    const selectElement = target as HTMLSelectElement;
    if (selectElement) {
      this.idsport = +selectElement.value;
    }
  }

  getSports() {
    this.SportService.getSports().subscribe((res: any) => {
      this.sports = res.data;     
    })
  }


  saveCoach() {

    var inputdata = {
     cin : this.cin,
     nom : this.nom,
     prenom : this.prenom,
     mail : this.mail,
     password : this.password,
     date_entree : this.date_entree,
     adress : this.adress,
     telephone : this.telephone,
     idsport: this.idsport,
     }

     this.CoachService.SaveCoach(inputdata).subscribe({
      next: (res : any) => {
          this.error = "";
          this.message = res.message;
          this.cin ="";
          this.nom = "";
          this.prenom = "";
          this.mail = "";
          this.password = "";
          this.adress = "";
          this.telephone = "";
          this.date_entree = null;
      },
      error:(err: any) => {
          console.log(err.error, 'errors');
          this.message = "";
          this.error = "Voulez bien verifier si tous les champs sont remplis";
      },
    });
  }
}
