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
    console.log(event); // Kiểm tra giá trị của event

    if (event.target.files && event.target.files.length > 0) {
      console.log(event.target.files); // Kiểm tra giá trị của event.target.files

      const file = event.target.files[0];
      const formData: any = new FormData();
      formData.append('image', file);
      this.productForm.get('image')?.setValue(formData); // Sử dụng phương thức setValue() của FormControl
    }
  }



  // ...

  onHandleAdd() {
    if (this.productForm.valid) {
      const product: IProduct = {
        name: this.productForm.value.name || "",
        author: this.productForm.value.author || "",
        image: "", // Khởi tạo giá trị rỗng
        price: this.productForm.value.price || 0,
        description: this.productForm.value.description || "",
        categoryId: this.productForm.value.categoryId || "",
      };

      const imageFormData: any = this.productForm.value.image; // Lưu trữ FormData vào biến imageFormData

      // Upload ảnh và nhận URL đã tải lên
      this.uploadService.AddImage(imageFormData.get('image')).subscribe(
        (response) => {
          const imageUrl = response.urls[0];
          console.log(imageUrl);

          product.image = imageUrl;

          // Gọi productService.addProduct() để thêm sản phẩm vào cơ sở dữ liệu
          this.productService.addProduct(product).subscribe(
            (addedProduct) => {
              // Xử lý khi sản phẩm được thêm thành công

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Product has been added successfully!',
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/admin/products']);
            },
            (error) => {
              // Xử lý khi có lỗi trong quá trình thêm sản phẩm
              console.log(error.message);
            }
          );
        },
        (error) => {
          // Xử lý khi có lỗi trong quá trình upload ảnh
          console.log(error.message);
        }
      );
    }
  }
}
