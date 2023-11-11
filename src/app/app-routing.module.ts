import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactUsPageComponent } from './pages/contact-us-page/contact-us-page.component';
import { BlogViewPageComponent } from './pages/blog-view-page/blog-view-page.component';
import { CategoryDetailComponent } from './pages/category-detail/category-detail.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { CartComponent } from './pages/cart/cart.component';
import { PayComponent } from './pages/pay/pay.component';
import { SignInComponent } from './pages/sign/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign/sign-up/sign-up.component';
import { BillComponent } from './pages/bill/bill.component';
import { authGuard } from './auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProductListComponent } from './pages/admin/adminProduct/product-list/product-list.component';
import { ProductAddComponent } from './pages/admin/adminProduct/product-add/product-add.component';
import { ProductUpdateComponent } from './pages/admin/adminProduct/product-update/product-update.component';
import { CategoryListComponent } from './pages/admin/adminCategory/category-list/category-list.component';
import { CategoryAddComponent } from './pages/admin/adminCategory/category-add/category-add.component';
import { CategoryEditComponent } from './pages/admin/adminCategory/category-edit/category-edit.component';
import { BlogListComponent } from './pages/admin/adminBlog/blog-list/blog-list.component';
import { BlogAddComponent } from './pages/admin/adminBlog/blog-add/blog-add.component';
import { BlogEditComponent } from './pages/admin/adminBlog/blog-edit/blog-edit.component';
import { UserListComponent } from './pages/admin/adminUser/user-list/user-list.component';
import { UserUpdateComponent } from './pages/admin/adminUser/user-update/user-update.component';
import { ListCommentComponent } from './pages/admin/adminComment/list-comment/list-comment.component';
import { ListBillComponent } from './pages/admin/adminBill/list-bill/list-bill.component';
import { DetailBillComponent } from './pages/admin/adminBill/detail-bill/detail-bill.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: "", component: BaseLayoutComponent, children: [
      { path: "", component: HomePageComponent },
      { path: "about", component: AboutPageComponent },
      { path: "contact", component: ContactUsPageComponent },
      { path: "blog", component: BlogViewPageComponent },
      { path: "category/:id", component: CategoryDetailComponent },
      { path: "product/:id", component: ProductDetailPageComponent },
      { path: "cart", component: CartComponent },
      { path: "pay", component: PayComponent },
      { path: "signin", component: SignInComponent },
      { path: "signup", component: SignUpComponent },
      {path: "bill", component: BillComponent}
    ]
  },
  {
    path: "admin", component: AdminLayoutComponent, canActivate: [authGuard], children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: DashboardComponent },
      { path: "products", component: ProductListComponent },
      { path: "products/add", component: ProductAddComponent },
      { path: "products/:id/update", component: ProductUpdateComponent },
      { path: "categories", component: CategoryListComponent },
      { path: "categories/add", component: CategoryAddComponent },
      { path: "categories/:id/update", component: CategoryEditComponent },
      { path: "blogs", component: BlogListComponent },
      { path: "blogs/add", component: BlogAddComponent },
      { path: "blogs/:id/update", component: BlogEditComponent },
      { path: "user", component: UserListComponent },
      { path: "user/:id/update", component: UserUpdateComponent },
      { path: "comments", component: ListCommentComponent },
      { path: "bill", component: ListBillComponent},
      {path: "bill/:id", component: DetailBillComponent}

    ]

  },
  {
    path: "**", component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
