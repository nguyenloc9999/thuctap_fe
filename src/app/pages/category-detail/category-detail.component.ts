import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/interface/category';
import { IProduct } from 'src/app/interface/product';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent {
  category !: ICategory
  categories: ICategory[] = [];
  products: IProduct[] = [];

  constructor(
    private CategoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      const id = String(params.get('id'));
      this.productService.getProducts().subscribe((products: any) => {
        this.products = products.docs.filter((product: IProduct) => product.categoryId === id);
        console.log(this.products);

      })
    })
    this.CategoryService.getCategories().subscribe((data) => {
      this.categories = data
    }, error => {
      console.log(error.message);
    })
  }
}
