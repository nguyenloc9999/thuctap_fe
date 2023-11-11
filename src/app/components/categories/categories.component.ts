import { Component } from '@angular/core';
import { ICategory } from 'src/app/interface/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories: ICategory[] = [];
  constructor(private CategoryService: CategoryService) {
    this.CategoryService.getCategories().subscribe((data) => {
      this.categories = data
    }, error => {
      console.log(error.message);
    })
  }
}
