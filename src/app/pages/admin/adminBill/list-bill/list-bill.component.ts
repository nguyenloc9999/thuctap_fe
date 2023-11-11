import { Component } from '@angular/core';
import { IBill } from 'src/app/interface/bill';
import { BillService } from 'src/app/services/bill/bill.service';

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.css']
})
export class ListBillComponent {
  bills : IBill[] = [];
  constructor( private billService: BillService){
    this.billService.getAllBill().subscribe((data:any) =>{
      this.bills = data
      console.log(data);
      
    }, error =>{
      console.log(error.message);
      
    })
  }
}
