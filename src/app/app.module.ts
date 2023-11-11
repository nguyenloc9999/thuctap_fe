import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { BannerComponent } from './components/banner/banner.component';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { BillComponent } from './pages/bill/bill.component';
import { BlogViewPageComponent } from './pages/blog-view-page/blog-view-page.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategoryDetailComponent } from './pages/category-detail/category-detail.component';
import { AuthInterceptor } from './auth.interceptor';
import { DetailBillComponent } from './pages/admin/adminBill/detail-bill/detail-bill.component';
import { ListBillComponent } from './pages/admin/adminBill/list-bill/list-bill.component';
import { BlogAddComponent } from './pages/admin/adminBlog/blog-add/blog-add.component';
import { BlogEditComponent } from './pages/admin/adminBlog/blog-edit/blog-edit.component';
import { BlogListComponent } from './pages/admin/adminBlog/blog-list/blog-list.component';
import { CategoryAddComponent } from './pages/admin/adminCategory/category-add/category-add.component';
import { CategoryEditComponent } from './pages/admin/adminCategory/category-edit/category-edit.component';
import { CategoryListComponent } from './pages/admin/adminCategory/category-list/category-list.component';
import { ListCommentComponent } from './pages/admin/adminComment/list-comment/list-comment.component';
import { ProductAddComponent } from './pages/admin/adminProduct/product-add/product-add.component';
import { ProductListComponent } from './pages/admin/adminProduct/product-list/product-list.component';
import { ProductUpdateComponent } from './pages/admin/adminProduct/product-update/product-update.component';
import { UserListComponent } from './pages/admin/adminUser/user-list/user-list.component';
import { UserUpdateComponent } from './pages/admin/adminUser/user-update/user-update.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { SignUpComponent } from './pages/sign/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign/sign-in/sign-in.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PayComponent } from './pages/pay/pay.component';
import { ContactUsPageComponent } from './pages/contact-us-page/contact-us-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    BlogPageComponent,
    CategoriesComponent,
    ContactPageComponent,
    ProductViewComponent,
    AdminLayoutComponent,
    BaseLayoutComponent,
    AboutPageComponent,
    BillComponent,
    BlogViewPageComponent,
    CartComponent,
    CategoryDetailComponent,
    DetailBillComponent,
    ListBillComponent,
    BlogAddComponent,
    BlogEditComponent,
    BlogListComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    CategoryListComponent,
    ListCommentComponent,
    ProductAddComponent,
    ProductListComponent,
    ProductUpdateComponent,
    UserListComponent,
    UserUpdateComponent,
    DashboardComponent,
    ProductDetailPageComponent,
    SignUpComponent,
    SignInComponent,
    HomePageComponent,
    PayComponent,
    ContactUsPageComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatDialogModule,
    MatPaginatorModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
