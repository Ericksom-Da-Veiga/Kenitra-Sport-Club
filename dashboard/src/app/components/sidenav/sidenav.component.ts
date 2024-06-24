import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{
  List!: any[];
  constructor(
    private HttpClient: HttpClient,
    private service: AuthService
  ){}

    ngOnInit(): void {
      this.HttpClient.get<any[]>('assets/SideBar.json').subscribe( sidebar=> {
        this.List = sidebar;
      });
    }
    activeItem: any;

    activer(champ: any) {
      this.List.forEach(item => item.class = ''); // Remove 'active' de todos os itens
      champ.class = "active"
    }

    Logout(){
      this.service.logout();
    }
}
