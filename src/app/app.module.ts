import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginService } from './login/login.service';
import { StorageService } from './common/storage.service';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { CustomerService } from './customer/customer.service';
import { CompanyComponent } from './company/company.component';
import { CustomerHeaderComponent } from './customer/customer-header/customer-header.component';
import { CustomerCouponDetailComponent } from './customer/customer-coupons/customer-coupon-detail/customer-coupon-detail.component';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';
import { CompanyService } from './company/company.service';
import { AdminService } from './admin/admin.service';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminStartComponent } from './admin/admin-start/admin-start.component';
import { CompanyHeaderComponent } from './company/company-header/company-header.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyCouponItemComponent } from './company/company-coupons/company-coupon-list/company-coupon-item/company-coupon-item.component';
import { CompanyCouponListComponent } from './company/company-coupons/company-coupon-list/company-coupon-list.component';
import { CompanyCouponNewComponent } from './company/company-coupons/company-coupon-new/company-coupon-new.component';
import { NgbAlert, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminCustomerItemComponent } from './admin/admin-customers/admin-customer-list/admin-customer-item/admin-customer-item.component';
import { AdminCustomerListComponent } from './admin/admin-customers/admin-customer-list/admin-customer-list.component';
import { AdminCompanyItemComponent } from './admin/admin-companies/admin-company-list/admin-company-item/admin-company-item.component';
import { AdminCompanyListComponent } from './admin/admin-companies/admin-company-list/admin-company-list.component';
import { AdminCustomersComponent } from './admin/admin-customers/admin-customers.component';
import { AdminCustomerNewComponent } from './admin/admin-customers/admin-customer-new/admin-customer-new.component';
import { AdminCustomerStartComponent } from './admin/admin-customers/admin-customer-start/admin-customer-start.component';
import { AdminCustomerDetailComponent } from './admin/admin-customers/admin-customer-detail/admin-customer-detail.component';
import { CompanyCouponsComponent } from './company/company-coupons/company-coupons.component';
import { CompanyCouponStartComponent } from './company/company-coupons/company-coupon-start/company-coupon-start.component';
import { CompanyCouponDetailsComponent } from './company/company-coupons/company-coupon-details/company-coupon-details.component';
import { CustomerCouponsComponent } from './customer/customer-coupons/customer-coupons.component';
import { CustomerCouponItemComponent } from './customer/customer-coupons/customer-coupon-list/customer-coupon-item/customer-coupon-item.component';
import { CustomerCouponListComponent } from './customer/customer-coupons/customer-coupon-list/customer-coupon-list.component';
import { CustomerCouponStartComponent } from './customer/customer-coupons/customer-coupon-start/customer-coupon-start.component';
import { CustomerCartComponent } from './customer/customer-cart/customer-cart.component';
import { CustomerCartStartComponent } from './customer/customer-cart/customer-cart-start/customer-cart-start.component';
import { CustomerCartDetailComponent } from './customer/customer-cart/customer-cart-detail/customer-cart-detail.component';
import { CustomerCartListComponent } from './customer/customer-cart/customer-cart-list/customer-cart-list.component';
import { CustomerCartItemComponent } from './customer/customer-cart/customer-cart-list/customer-cart-item/customer-cart-item.component';
import { AdminCompaniesComponent } from './admin/admin-companies/admin-companies.component';
import { AdminCompanyDetailComponent } from './admin/admin-companies/admin-company-detail/admin-company-detail.component';
import { AdminCompanyNewComponent } from './admin/admin-companies/admin-company-new/admin-company-new.component';
import { AdminCompanyStartComponent } from './admin/admin-companies/admin-company-start/admin-company-start.component';
import { TokenErrorService } from './errors/token-error.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CompanyComponent,
    AdminComponent,
    CustomerComponent,
    CustomerCouponItemComponent,
    CustomerCouponListComponent,
    CustomerEditComponent,
    CustomerDetailComponent,
    CustomerHeaderComponent,
    CustomerCouponDetailComponent,
    CompanyDetailComponent,
    AdminHeaderComponent,
    AdminStartComponent,
    CompanyHeaderComponent,
    CompanyEditComponent,
    CompanyCouponItemComponent,
    CompanyCouponListComponent,
    CompanyCouponNewComponent,
    AdminCustomerItemComponent,
    AdminCustomerListComponent,
    AdminCompanyItemComponent,
    AdminCompanyListComponent,
    AdminCustomersComponent,
    AdminCustomerStartComponent,
    AdminCustomerNewComponent,
    AdminCustomerDetailComponent,
    CompanyCouponsComponent,
    CompanyCouponStartComponent,
    CompanyCouponDetailsComponent,
    CustomerCouponsComponent,
    CustomerCouponStartComponent,
    CustomerCartComponent,
    CustomerCartStartComponent,
    CustomerCartDetailComponent,
    CustomerCartListComponent,
    CustomerCartItemComponent,
    AdminCompaniesComponent,
    AdminCompanyDetailComponent,
    AdminCompanyNewComponent,
    AdminCompanyStartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [LoginService, StorageService, CompanyService, CustomerService, AdminService, HttpParams, TokenErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
