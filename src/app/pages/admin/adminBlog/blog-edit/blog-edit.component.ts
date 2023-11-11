import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBlog } from 'src/app/interface/blog';
import { BlogService } from 'src/app/services/blog/blog.service';
import { UploadService } from 'src/app/services/upload/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent {
  blog!: IBlog;
  submitted = false;
  blogForm = this.formBuilder.group({
    author: ['', [Validators.required, Validators.minLength(4),Validators.pattern('^[^0-9]+$')]],
    title: ['', [Validators.required, Validators.minLength(4),Validators.pattern('^[^0-9]+$')]],
    description: ['', [Validators.required, Validators.minLength(4)]],
    image: ['']
  })

  constructor(private blogService: BlogService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private uploadService: UploadService

  ) {
    this.route.paramMap.subscribe(params => {
      const id = String(params.get('id'));
      this.blogService.getBlogId(id).subscribe(blog => {
        this.blog = blog;
        this.blogForm.patchValue({
          author: this.blog.author,
          title: this.blog.title,
          description: this.blog.description,
        })
      }, error => console.log(error.message)
      )
    })
  }

  selectedImage: any = null; // Biến lưu trữ ảnh được chọn

  onSelectImage(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
      this.blogForm.patchValue({ image: this.selectedImage });
    } else {
      this.selectedImage = null;
      this.blogForm.patchValue({ image: null });
    }
  }
  onHandleUpdate() {
    if (this.blogForm.valid) {
      const newBlog: IBlog = {
        _id: this.blog._id,
        author: this.blogForm.value.author || "",
        image: this.blog.image, // Sử dụng ảnh cũ mặc định
        title: this.blogForm.value.title || "",
        description: this.blogForm.value.description || "",
      }
      if (this.selectedImage) {
        const publicId = this.blog.image.publicId;
        console.log(publicId);

        // Tải lên ảnh mới và nhận URL đã tải lên

        this.uploadService.updateImage(publicId, this.selectedImage).subscribe(
          (response) => {

            const imageUrl = response
            console.log(imageUrl);

            if (imageUrl) {
              newBlog.image = imageUrl;

              // Gọi productService.updateProduct() để cập nhật thông tin sản phẩm
              this.blogService.updateBlog(newBlog).subscribe(
                (updateBlog) => {
                  // Xử lý khi sản phẩm được cập nhật thành công
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Blog has been updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.router.navigate(['/admin/blogs']);
                },
                (error) => {
                  // Xử lý khi có lỗi trong quá trình cập nhật sản phẩm
                  console.log(error.message);
                }
              );
            } else {
              // Xử lý khi không có URL mới để cập nhật
              console.log('Không có URL mới để cập nhật');
            }
          },
          (error) => {
            // Xử lý khi có lỗi trong quá trình upload ảnh
            console.log(error.message);
          }
        );
      } else {
        // Người dùng không chọn ảnh mới, chỉ cập nhật thông tin sản phẩm
        this.blogService.updateBlog(newBlog).subscribe(
          (updateBlog) => {
            // Xử lý khi sản phẩm được cập nhật thành công
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Blog has been updated successfully!',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/admin/blogs']);
          },
          (error) => {
            // Xử lý khi có lỗi trong quá trình cập nhật sản phẩm
            console.log(error.message);
          }
        );
      }

    }
  }
}
