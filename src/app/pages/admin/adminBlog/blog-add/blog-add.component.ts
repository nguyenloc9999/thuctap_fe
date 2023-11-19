import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IBlog } from 'src/app/interface/blog';
import { BlogService } from 'src/app/services/blog/blog.service';
import { UploadService } from 'src/app/services/upload/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})
export class BlogAddComponent {
  submitted = false;
  blogForm = this.formBuilder.group({

    author: ['', [Validators.required, Validators.minLength(4),Validators.pattern('^[^0-9]+$')]],
    title: ['', [Validators.required, Validators.minLength(4),Validators.pattern('^[^0-9]+$')]],
    description: ['', [Validators.required, Validators.minLength(4)]],
    image: ['', [Validators.required]]
  })
  constructor(private BlogService: BlogService,
    private formBuilder: FormBuilder,
    private router: Router,
    private uploadService: UploadService

  ) { }
  onSelectImage(event: any) {
    console.log(event); 

    if (event.target.files && event.target.files.length > 0) {
      console.log(event.target.files); 

      const file = event.target.files[0];
      const formData: any = new FormData();
      formData.append('image', file);
      this.blogForm.get('image')?.setValue(formData); 
    }
  }
  onHandleAdd() {
    if (this.blogForm.valid) {
      const blog: IBlog = {
        author: this.blogForm.value.author || "",
        image: "", 
        title: this.blogForm.value.title || "",
        description: this.blogForm.value.description || "",
      }
      const imageFormData: any = this.blogForm.value.image; 

     
      this.uploadService.AddImage(imageFormData.get('image')).subscribe(
        (response) => {
          const imageUrl = response.urls[0];
          console.log(imageUrl);

          blog.image = imageUrl;

          
          this.BlogService.addBlog(blog).subscribe(
            (addBlog) => {
              

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Thêm blog thành công!',
                showConfirmButton: false,
                timer: 1000
              });
              this.router.navigate(['/admin/blogs']);
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
