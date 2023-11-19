import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill/bill.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  detailOrder: any[] = [];

  constructor(private orderService: BillService) { }

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(): void {
    this.orderService.getAllBill().subscribe(
      (response: any[]) => {
        this.detailOrder = response;
        console.log(this.detailOrder);
        
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  huyDon(orderId: string, status: string): void {
    const updatedStatus = '6488a33d098b67f90d85df7a'; 

    Swal.fire({
      title: 'Hủy đơn hàng',
      text: 'Bạn có chắc muốn hủy đơn hàng này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.updateBill({ _id: orderId, status: updatedStatus }).subscribe(
          (response: any) => {
            console.log(response);
            Swal.fire('Thành công', 'Đã hủy đơn hàng', 'success');
            this.getOrderDetails();
          },
          (error: any) => {
            console.log('Error:', error);
            Swal.fire('Lỗi', 'Đã xảy ra lỗi khi hủy đơn hàng', 'error');
          }
        );
      }
    });
  }

}
