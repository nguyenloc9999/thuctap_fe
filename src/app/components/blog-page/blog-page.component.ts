import { Component } from '@angular/core';
import { IBlog } from 'src/app/interface/blog';
import { BlogService } from 'src/app/services/blog/blog.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent {
  blogs: IBlog[] = [];

  constructor(private BlogService: BlogService) {
}
ngOnInit() {
  this.BlogService.getBlogs()
  .subscribe((data : any) => this.blogs = data)
}
}
