import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './Auth/admin-login/admin-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCategoryComponent } from './dashboard/category/add-category/add-category.component';
import { CategoryReportComponent } from './dashboard/category/category-report/category-report.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {MatTableModule} from '@angular/material/table';
import { EditCategoryComponent } from './dashboard/category/edit-category/edit-category.component';
import { AddProductComponent } from './dashboard/product/add-product/add-product.component';
import { ProductReportComponent } from './dashboard/product/product-report/product-report.component';
import { AddCompanyComponent } from './dashboard/company/add-company/add-company.component';
import { CompanyReportComponent } from './dashboard/company/company-report/company-report.component';
import { EditCompanyComponent } from './dashboard/company/edit-company/edit-company.component';
import { EditProductComponent } from './dashboard/product/edit-product/edit-product.component';
import { StartSellComponent } from './dashboard/order/start-sell/start-sell.component';
import { OrderDetailsComponent } from './dashboard/order/order-details/order-details.component';
import { OrderReportComponent } from './dashboard/order/order-report/order-report.component';
import {NgxPrintModule} from 'ngx-print';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    DashboardComponent,
    AddCategoryComponent,
    CategoryReportComponent,
    EditCategoryComponent,
    AddProductComponent,
    ProductReportComponent,
    AddCompanyComponent,
    CompanyReportComponent,
    EditCompanyComponent,
    EditProductComponent,
    StartSellComponent,
    OrderDetailsComponent,
    OrderReportComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    NgxPrintModule,
    MatTabsModule,
    MatMenuModule,
    
    
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
