import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BillService } from 'src/app/services/bill/bill.service';
import { CartService } from 'src/app/services/cart/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent {
  cart: any;
  userId: string;
  data: any;
  billForm: FormGroup;

  constructor(
    private cartService: CartService,
    private router: Router,
    private formBuilder: FormBuilder,
    private billService: BillService
  ) {
    this.userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).user._id : '';
    this.data = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : '';

    this.billForm = this.formBuilder.group({
      userId: [''],
      name: [''],
      address: [''],
      phone: [''],
      notes: ['']
    });
    this.billForm.patchValue({
      userId: this.data?.user?._id,
      name: this.data?.user?.name,
      address: this.data?.user?.address
    });
  }

  ngOnInit() {
    if (this.userId === '') return;
    this.cartService.getCart(this.userId).subscribe(cart => {
      this.cart = cart;
    });

    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).accessToken : '';
    if (!token) {
      this.router.navigate(['/signin']);
    }
  }

  onHandlePay() {
    if (this.billForm.valid) {
      const products = this.cart.data.products.map((product: any) => {
        return {
          productId: product.productId,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: product.quantity
        };
      });

      const bill = {
        userId: this.billForm.value.userId || '',
        name: this.billForm.value.name || '',
        address: this.billForm.value.address || '',
        phone: this.billForm.value.phone || '',
        notes: this.billForm.value.notes || '',
        products: products,
        total: this.cart.data.total
      };
      console.log(bill);


      this.billService.addBill(bill).subscribe(
        (response) => {
          console.log(response);

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Đã thêm đơn hàng thành công!',
            showConfirmButton: false,
            timer: 1000
          });
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
  }
}
