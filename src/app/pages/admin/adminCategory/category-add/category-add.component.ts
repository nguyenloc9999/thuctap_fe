import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/interface/category';
import { CategoryService } from 'src/app/services/category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent {
  submitted=false
  categoryForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4),Validators.pattern('^[^0-9]+$')]],

  })
  constructor(private CategoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router) { }
  onHandleAdd() {
    if (this.categoryForm.valid) {
      const category: ICategory = {
        name: this.categoryForm.value.name || "",
      }
      this.CategoryService.addCategory(category).subscribe(category => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Thêm danh mục thành công!',
          showConfirmButton: false,
          timer: 1000
        })
        this.router.navigate(['/admin/categories'])
      }, error => {
        console.log(error.message);
    
      })
    }
  }
}
