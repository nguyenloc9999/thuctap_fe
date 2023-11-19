import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { IProduct } from 'src/app/interface/product';
import { Icart } from 'src/app/interface/cart';
import { ProductService } from 'src/app/services/product/product.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent {
  cart!: Icart;
  productsInCart: IProduct[] = [];
  cartItemCount: number = 0;
  searchValue = '';
  products: IProduct[] = [];
  @Input() searchResults: IProduct[] = [];
  showLogoutDropdown: boolean = false;
  isAdmin: boolean = false; 

  constructor(
    private productService: ProductService,
    private router: Router,
    private CartService: CartService,
    private dialog: MatDialog,
  ) { }
  
  userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).user?._id : '';

  openDialog(type: 'signin' | 'signup') {
    if (type === 'signup') {
      this.router.navigate(['/signup']);
    }
    if (type === 'signin') {
      this.router.navigate(['/signin']);
    }
  }

  getUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem('user')!);
    return userInfo;
  }

  handleLogout() {
    const logout = localStorage.removeItem('user');
    return logout;
  }

  getProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data.docs;
    });
  }

  ngOnInit() {
    this.getProducts();
    if (this.userId === '') return;

    const userInfo = this.getUserInfo();
    this.isAdmin = userInfo && userInfo.user && userInfo.user.role === 'admin';

    this.CartService.getCart(this.userId).subscribe(cart => {
      this.cart = cart;
      if (this.cart && this.cart.data) {
        this.productsInCart = this.cart.data.products;
        this.cartItemCount = this.productsInCart?.length ?? 0;
      }
    });
  }

  onSearch() {
    if (!this.searchValue.trim()) {
      this.searchResults = [];
      return;
    }
    this.productService.searchProducts(this.searchValue).subscribe((data: any) => {
      this.searchResults = data.docs;
    });
  }

  onSearchBlur() {
    if (!this.searchValue.trim()) {
      this.searchResults = [];
    }
  }

  
  goToAdminPage() {
    this.router.navigate(['/admin']);
  }
}
