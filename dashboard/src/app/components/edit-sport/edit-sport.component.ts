import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SportPost, SportService } from 'src/app/services/sport/sport.service';

@Component({
  selector: 'app-edit-sport',
  templateUrl: './edit-sport.component.html',
  styleUrls: ['./edit-sport.component.scss']
})
export class EditSportComponent {
  sport!: SportPost;
  sportID!: any

  constructor(
    private activeroute: ActivatedRoute,
    private SportService: SportService,
    private route: Router
  ){}

  ngOnInit(){
    this.sportID = this.activeroute.snapshot.paramMap.get('id');
    
    this.SportService.detailSport(this.sportID).subscribe((res: any) => {
      this.sport = res.data[0];
    })
  }
  updateSport() {
  var inputdata = {
    id:this.sportID,
    nom: this.sport.nom,
    nmbr_max_seance_semaine: this.sport.nmbr_max_seance_semaine,
    prix: this.sport.prix
  }
  this.SportService.UpdateSport(inputdata).subscribe({
    next: (res : any) => {
      this.route.navigate(['/sports'])
      alert("Sport Modifiè")
    },error: (err : any) => {
        console.log(err, 'error');
    },
  })
  }

}
