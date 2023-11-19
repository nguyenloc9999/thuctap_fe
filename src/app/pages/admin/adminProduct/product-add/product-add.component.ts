import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/interface/category';
import { IProduct } from 'src/app/interface/product';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import { UploadService } from 'src/app/services/upload/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  categories: ICategory[] = [];
  submitted = false;

  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    author: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[^0-9]+$')]],
    image: ['', [Validators.required]],
    price: [null, [Validators.required, Validators.min(1)]],
    description: ['', [Validators.required, Validators.minLength(4)]],
    categoryId: ['', [Validators.required]]
  })
  constructor(private CategoryService: CategoryService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private uploadService: UploadService

  ) {
    this.CategoryService.getCategories().subscribe((data) => {
      this.categories = data
    }, error => {
      console.log(error.message);

    })
  }
  onSelectImage(event: any) {
    console.log(event); 

    if (event.target.files && event.target.files.length > 0) {
      console.log(event.target.files); 

      const file = event.target.files[0];
      const formData: any = new FormData();
      formData.append('image', file);
      this.productForm.get('image')?.setValue(formData); 
    }
  }


  onHandleAdd() {
    if (this.productForm.valid) {
      const product: IProduct = {
        name: this.productForm.value.name || "",
        author: this.productForm.value.author || "",
        image: "", 
        price: this.productForm.value.price || 0,
        description: this.productForm.value.description || "",
        categoryId: this.productForm.value.categoryId || "",
      };

      const imageFormData: any = this.productForm.value.image; 

      
      this.uploadService.AddImage(imageFormData.get('image')).subscribe(
        (response) => {
          const imageUrl = response.urls[0];
          console.log(imageUrl);

          product.image = imageUrl;

         
          this.productService.addProduct(product).subscribe(
            (addedProduct) => {
              

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Thêm sản phẩm thành công!',
                showConfirmButton: false,
                timer: 1000
              });
              this.router.navigate(['/admin/products']);
            },
            (error) => {
              
              console.log(error.message);
            }
          );
        },
        (error) => {
         
          console.log(error.message);
        }
      );
    }
  }
}
