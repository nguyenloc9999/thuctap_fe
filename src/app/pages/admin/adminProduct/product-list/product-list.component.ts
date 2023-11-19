import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/interface/category';
import { IProduct } from 'src/app/interface/product';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator
  products: IProduct[] = [];
  categories: ICategory[] = [];
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,

  ) {
    this.paginator = {} as MatPaginator
  }
  pagination = {
    hasNextPage: true,
    hasPrevPage: false,
    limit: 1,
    nextPage: 1,
    page: 1,
    pagingCounter: 1,
    prevPage: null,
    totalDocs: 1,
    totalPages: 1
  }

  limit = 6

  formattedPagination: any = {}

  async ngOnInit() {
    try {
      this.getProduct(1);

      this.categoryService.getCategories().subscribe(
        (categoriesData: any) => {
          this.categories = categoriesData;
         
          this.mapCategoryToProducts();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  pageIndex: any
  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex 
    this.limit = event.pageSize 
    this.getProduct(this.pageIndex + 1) 
  }
  getProduct(page: number): void {
    this.productService.getAllProducts(this.limit, page).subscribe((res: any) => {
      this.products = res.docs
      this.formattedPagination.length = res.totalDocs
      this.formattedPagination.pageIndex = res.page - 1
      this.formattedPagination.pageSize = res.limit
      this.formattedPagination.pageSizeOptions = [3, 6]
      this.formattedPagination.totalPages = res.totalPages
      this.formattedPagination.page = res.page
      this.mapCategoryToProducts();

    })
  }
  mapCategoryToProducts() {
    this.products = this.products.map((product: IProduct) => {
      const category = this.categories.find((category: ICategory) => category._id === product.categoryId);
      return { ...product, category: category ? category.name : '' };
    });
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
            'Xóa sản phẩm thành công',
            'success'
          )
          this.products = this.products.filter(item => item._id !== id);
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
        Swal.fire(
          'Cancelled',
          'Xóa sản phẩm thất bại',
          'error'
        )
      }
    })

  }
}
