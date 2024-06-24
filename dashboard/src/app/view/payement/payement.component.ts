import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { PayementService } from 'src/app/services/payement/payement.service';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.scss']
})
export class PayementComponent implements OnInit{

  MonthBudget!: number;
  TotalBudget!: number;

  constructor(
    private service: PayementService
  ){}
  ngOnInit(): void {
    this.countMoney();
    this.countMoneyForMonth()
  }

  countMoneyForMonth(){
    this.service.countMoneyForMonth().subscribe((res:any)=>{
      this.MonthBudget = res.data[0];
    })
  }

  countMoney(){
    this.service.countTotalMoney().subscribe((res: any)=>{
      this.TotalBudget = res.data[0]
    })
  }
}
