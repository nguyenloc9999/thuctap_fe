import { Component } from '@angular/core';
import { IBlog } from 'src/app/interface/blog';
import { BlogService } from 'src/app/services/blog/blog.service';

@Component({
  selector: 'app-blog-view-page',
  templateUrl: './blog-view-page.component.html',
  styleUrls: ['./blog-view-page.component.css']
})
export class BlogViewPageComponent {
  blogs: IBlog[] = [];

  constructor(private BlogService: BlogService) {
}
ngOnInit() {
  this.BlogService.getBlogs()
  .subscribe((data : any) => this.blogs = data)
}
}
