import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{
  List!: any[];
  constructor(private HttpClient: HttpClient){}

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
}
