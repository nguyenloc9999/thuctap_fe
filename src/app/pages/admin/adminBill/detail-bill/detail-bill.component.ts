import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IBill } from 'src/app/interface/bill';
import { IStatus } from 'src/app/interface/status';
import { BillService } from 'src/app/services/bill/bill.service';
import { StatusService } from 'src/app/services/status/status.service';

@Component({
  selector: 'app-detail-bill',
  templateUrl: './detail-bill.component.html',
  styleUrls: ['./detail-bill.component.css']
})
export class DetailBillComponent {
  bills !: IBill
  billproduct !:any
  statusList: IStatus[] = []
  order!:any
  orderForm = this.formBuilder.group({
    status: ["",[Validators.required]],
  })
  constructor(
    private billService: BillService,
    private route: ActivatedRoute,
    private statusService: StatusService,
    private router: Router,
    private formBuilder : FormBuilder,
  ) {
    this.route.paramMap.subscribe(params => {
      const id = String(params.get('id'));
      if (id) {
        this.billService.getBillId(id).subscribe((bill: any) => {
          this.bills = bill;
          this.order = bill.order || "";
          this.billproduct = bill.products;
          this.orderForm.patchValue({
            status: bill.status,
          });
        });
      }
      
    })
    this.statusService.getAllStatus().subscribe(data => this.statusList = data)
  }
  onHandleSubmit(){
    if(this.orderForm.valid){
      
      const order: IBill ={    
        _id:this.bills._id,
        status:this.orderForm.value.status || "",
      }
      console.log(order);
      
      this.billService.updateBill(order).subscribe(data => {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Đơn hàng cập nhật thành công',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(["/admin/bill"])  
      }, error => {
        console.log(error.message);
            
      })
    }}
}
