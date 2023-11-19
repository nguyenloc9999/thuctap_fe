import { Component, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/interface/product';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements AfterViewInit {
  searchValue = '';
  products: IProduct[] = [];
  @Input() searchResults: IProduct[] = [];
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngAfterViewInit() {
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

    allSideMenu.forEach(item => {
      const li = item.parentElement;

      item.addEventListener('click', function () {
        allSideMenu.forEach(i => {
          i.parentElement?.classList.remove('active');
        })
        li?.classList.add('active');
      })
    });
    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    const sidebar = document.getElementById('sidebar');
    menuBar?.addEventListener('click', function () {
      sidebar?.classList.toggle('hide');
    });

   
    const searchButton = document.querySelector('#content nav form .form-input button');
    const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
    const searchForm = document.querySelector('#content nav form');

    searchButton?.addEventListener('click', function (e) {
      if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm?.classList.toggle('show');
        if (searchForm?.classList.contains('show')) {
          searchButtonIcon?.classList.replace('bx-search', 'bx-x');
        } else {
          searchButtonIcon?.classList.replace('bx-x', 'bx-search');
        }
      }
    })
    
    if (window.innerWidth < 768) {
      sidebar?.classList.add('hide');
    } else if (window.innerWidth > 576) {
      searchButtonIcon?.classList.replace('bx-x', 'bx-search');
      searchForm?.classList.remove('show');
    }
    window.addEventListener('resize', function () {
      if (this.innerWidth > 576) {
        searchButtonIcon?.classList.replace('bx-x', 'bx-search');
        searchForm?.classList.remove('show');
      }
    })
  

  }

  getProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data.docs;
    });
  }

  ngOnInit() {
    this.getProducts();
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
  onHandleRemove(id: any) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.productService.removeProduct(id).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Xóa thành công.',
            'success'
          )
         
          this.getProducts();

         
          if (this.searchValue.trim()) {
            this.onSearch();
          }
          this.products = this.products.filter(item => item._id !== id);
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
        Swal.fire(
          'Cancelled',
          'Xóa thất bại',
          'error'
        )
      }
    })
  }

  onHandleOut() {
    localStorage.removeItem("user")
    this.router.navigate(['/'])
  }
}
