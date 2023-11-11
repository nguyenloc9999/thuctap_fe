import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogViewPageComponent } from './blog-view-page.component';

describe('BlogViewPageComponent', () => {
  let component: BlogViewPageComponent;
  let fixture: ComponentFixture<BlogViewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogViewPageComponent]
    });
    fixture = TestBed.createComponent(BlogViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
