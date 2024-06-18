import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachPost, CoachService } from 'src/app/services/coach/coach.service';
import { SportService, SportResponse } from 'src/app/services/sport/sport.service';

@Component({
  selector: 'app-edit-coach',
  templateUrl: './edit-coach.component.html',
  styleUrls: ['./edit-coach.component.scss']
})
export class EditCoachComponent implements OnInit {

  coach!: CoachPost;
  coachId!: any;
  sports !: SportResponse[];
  idsport!: Number;

  constructor(
    private activeroute: ActivatedRoute, 
    private CoachService: CoachService,
    private SportService: SportService,
    private route: Router
  ){}

  ngOnInit(){
    this.coachId = this.activeroute.snapshot.paramMap.get('id');
    
    this.CoachService.detailCoachs(this.coachId).subscribe((res: any) => {
      this.coach = res.data[0];
    })

    this.getSports();
  }
  getSports() {
    this.SportService.getSports().subscribe((res: any) => {
      this.sports = res.data;     
    })
  }
updateCoach() {
    var inputdata = {
      id : this.coachId,
      cin : this.coach.cin,
      nom : this.coach.nom,
      prenom : this.coach.prenom,
      mail : this.coach.mail,
      password : this.coach.password,
      date_naissance : this.coach.date_entree,
      adress : this.coach.adress,
      telephone : this.coach.telephone,
      idsport : this.coach.idsport,
      }

      this.CoachService.UpdateCoachs(inputdata).subscribe({
        next: (res:any) => {
          this.route.navigate(['/monitor']);
          alert(res.message);
        },error:(err:any)=> {
            alert("Nous avons trouvez un probleme, essayer plus tard");
        },
      })
}

onSportChange({ target }: { target: EventTarget | null }): void {
  const selectElement = target as HTMLSelectElement;
  if (selectElement) {
    this.idsport = +selectElement.value;
  }
}

}
