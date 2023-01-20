import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './Auth/admin-login/admin-login.component';
import { AuthGuard } from './Auth/Guard/auth.guard';
import { RoleGuard } from './Auth/Guard/role.guard';
import { AddCategoryComponent } from './dashboard/category/add-category/add-category.component';
import { CategoryReportComponent } from './dashboard/category/category-report/category-report.component';
import { EditCategoryComponent } from './dashboard/category/edit-category/edit-category.component';
import { AddCompanyComponent } from './dashboard/company/add-company/add-company.component';
import { CompanyReportComponent } from './dashboard/company/company-report/company-report.component';
import { EditCompanyComponent } from './dashboard/company/edit-company/edit-company.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderDetailsComponent } from './dashboard/order/order-details/order-details.component';
import { OrderReportComponent } from './dashboard/order/order-report/order-report.component';
import { StartSellComponent } from './dashboard/order/start-sell/start-sell.component';
import { AddProductComponent } from './dashboard/product/add-product/add-product.component';
import { EditProductComponent } from './dashboard/product/edit-product/edit-product.component';
import { ProductReportComponent } from './dashboard/product/product-report/product-report.component';

const routes: Routes = [
  {path: '', component:AdminLoginComponent},
  {path:'dashboard', component: DashboardComponent
  ,
  children: [
    {path: 'add-category', component:AddCategoryComponent,
               canActivate: [RoleGuard], data: { role: ['admin'] }},
  {path:'category-report',component:CategoryReportComponent,
               canActivate: [RoleGuard], data: { role: ['admin'] }},
  {path:'category-report/:cid', component:EditCategoryComponent,
               canActivate: [RoleGuard], data: { role: ['admin'] }},
              
  {path:'add-company', component:AddCompanyComponent,
              canActivate: [RoleGuard], data: { role: ['admin'] }},
  {path:'company-report', component: CompanyReportComponent,
              canActivate: [RoleGuard], data: { role: ['admin'] }},
  {path:'company-report/:cmpid', component:EditCompanyComponent,
               canActivate: [RoleGuard], data: { role: ['admin'] }},
  
  {path:'add-product', component:AddProductComponent,
               canActivate: [RoleGuard], data: { role: ['admin'] }},
  {path:'product-report', component:ProductReportComponent,
               canActivate: [RoleGuard], data: { role: ['admin'] }},
  {path:'product-report/:pid', component:EditProductComponent,
               canActivate: [RoleGuard], data: { role: ['admin'] }},

  {path:'sell', component:StartSellComponent,
              canActivate: [RoleGuard], data: { role: ['admin', 'user'] }},
  {path:'sell/order-details/:orderid', component:OrderDetailsComponent,
              canActivate: [RoleGuard], data: { role: ['admin', 'user'] } },
  {path:'order-report', component:OrderReportComponent,
              canActivate: [RoleGuard], data: { role: ['admin', 'user'] }},
  {path:'order-report/:orderid', component:OrderDetailsComponent,
              canActivate: [RoleGuard], data: { role: ['admin', 'user'] }}

]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
