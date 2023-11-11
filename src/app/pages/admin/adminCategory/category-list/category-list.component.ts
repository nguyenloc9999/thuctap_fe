import { Component, ElementRef, ViewChild } from '@angular/core';
import { ICategory } from 'src/app/interface/category';
import { CategoryService } from 'src/app/services/category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
  categories: ICategory[] = [];
  @ViewChild('notification') notification!: ElementRef<HTMLDivElement>;

  constructor(private CategoryService: CategoryService) {
    this.CategoryService.getCategories().subscribe((data) => {
      this.categories = data
    }, error => {
      console.log(error.message);
    })
  }
  removeItem(id: any) {


    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Xóa danh mục
        this.CategoryService.removeCategory(id).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          const newCategory = this.categories.filter((category) => category._id != id);
          this.categories = newCategory
        }, error => {
          console.log(error.message);
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Cancelled',
          'Your product is safe :)',
          'error'
        )
      }
    })
  }
}
