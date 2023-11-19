import { Component, ElementRef, ViewChild } from '@angular/core';
import { IBlog } from 'src/app/interface/blog';
import { BlogService } from 'src/app/services/blog/blog.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent {
  blogs: IBlog[] = [];
   @ViewChild('notification') notification!: ElementRef<HTMLDivElement>;

  constructor(private BlogService: BlogService) {
    this.BlogService.getBlogs().subscribe((data) => {
      this.blogs = data
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
          
          this.BlogService.removeBlog(id).subscribe(() => {
            Swal.fire(
              'Deleted!',
              'Xóa blog thành công.',
              'success'
            )
            const newBlog = this.blogs.filter((blog) => blog._id != id);
            this.blogs = newBlog
          }, error => {
            console.log(error.message);
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          
          Swal.fire(
            'Cancelled',
            'Xóa blog thất bại',
            'error'
          )
        }
      })
    
      

     
    
  }
  showNotification(msg: string) {
    this.notification.nativeElement.innerHTML = msg;
    this.notification.nativeElement.style.display = 'block';
    setTimeout(() => {
      this.notification.nativeElement.style.display = 'none';
    }, 3000);
  }
}
