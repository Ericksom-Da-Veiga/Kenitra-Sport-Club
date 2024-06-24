import { Component,OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.scss']
})
export class DashboardCardsComponent {

  @Input() myclass!: string;
  @Input() titleh3!: string;
  @Input() text!: string;
  @Input() link!: string
}
