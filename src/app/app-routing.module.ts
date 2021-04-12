import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CompanyComponent } from './company/company.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './login/login.component';
import { CustomerCouponDetailComponent } from './customer/customer-coupons/customer-coupon-detail/customer-coupon-detail.component';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';
import { AdminStartComponent } from './admin/admin-start/admin-start.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyCouponNewComponent } from './company/company-coupons/company-coupon-new/company-coupon-new.component';
import { AdminCustomersComponent } from './admin/admin-customers/admin-customers.component';
import { AdminCustomerStartComponent } from './admin/admin-customers/admin-customer-start/admin-customer-start.component';
import { AdminCustomerNewComponent } from './admin/admin-customers/admin-customer-new/admin-customer-new.component';
import { AdminCustomerDetailComponent } from './admin/admin-customers/admin-customer-detail/admin-customer-detail.component';
import { CompanyCouponsComponent } from './company/company-coupons/company-coupons.component';
import { CompanyCouponStartComponent } from './company/company-coupons/company-coupon-start/company-coupon-start.component';
import { CompanyCouponDetailsComponent } from './company/company-coupons/company-coupon-details/company-coupon-details.component';
import { CustomerCouponStartComponent } from './customer/customer-coupons/customer-coupon-start/customer-coupon-start.component';
import { CustomerCouponsComponent } from './customer/customer-coupons/customer-coupons.component';
import { CustomerCartComponent } from './customer/customer-cart/customer-cart.component';
import { CustomerCartStartComponent } from './customer/customer-cart/customer-cart-start/customer-cart-start.component';
import { CustomerCartDetailComponent } from './customer/customer-cart/customer-cart-detail/customer-cart-detail.component';
import { AdminCompaniesComponent } from './admin/admin-companies/admin-companies.component';
import { AdminCompanyStartComponent } from './admin/admin-companies/admin-company-start/admin-company-start.component';
import { AdminCompanyNewComponent } from './admin/admin-companies/admin-company-new/admin-company-new.component';
import { AdminCompanyDetailComponent } from './admin/admin-companies/admin-company-detail/admin-company-detail.component';

const routes: Routes = [

  /* Login paths */
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },

  /* Admin paths */
  {
    path: "admin", component: AdminComponent, children: [
      { path: "", component: AdminStartComponent },
      { path: "start", component: AdminStartComponent },

      /* admin-customer functionality paths*/
      {
        path: "all-cust", component: AdminCustomersComponent, children: [
          { path: "", component: AdminCustomerStartComponent },
          { path: "start", component: AdminCustomerStartComponent },
          { path: "new", component: AdminCustomerNewComponent },
          { path: ":id", component: AdminCustomerDetailComponent },
        ]
      },
      /* admin logged-in as customer functionality paths*/
      {
        path: "customer", component: CustomerComponent, children: [
          { path: "", component: CustomerDetailComponent },
          { path: "edit", component: CustomerEditComponent },
          {
            path: "coupons", component: CustomerCouponsComponent, children: [
              { path: "", component: CustomerCouponStartComponent },
              { path: ":id", component: CustomerCouponDetailComponent },
            ]
          },
          {
            path: "cart", component: CustomerCartComponent, children: [
              { path: "", component: CustomerCartStartComponent },
              { path: ":id", component: CustomerCartDetailComponent },
            ]
          },
        ]
      },

      /* admin-company functionality paths*/
      {
        path: "all-comp", component: AdminCompaniesComponent, children: [
          { path: "", component: AdminCompanyStartComponent },
          { path: "start", component: AdminCompanyStartComponent },
          { path: "new", component: AdminCompanyNewComponent },
          { path: ":id", component: AdminCompanyDetailComponent },
        ]
      },
      /* admin logged-in as company functionality paths*/
      {
        path: "company", component: CompanyComponent, children: [
          { path: "", component: CompanyDetailComponent },
          { path: "edit", component: CompanyEditComponent },
          {
            path: "coupons", component: CompanyCouponsComponent, children: [
              { path: "", component: CompanyCouponStartComponent },
              { path: "start", component: CompanyCouponStartComponent },
              { path: "new", component: CompanyCouponNewComponent },
              { path: ":id", component: CompanyCouponDetailsComponent },
              { path: ":id/edit", component: CompanyCouponNewComponent },
            ]
          },
        ]
      },
    ]
  },

  /* Company paths: */
  {
    path: "company", component: CompanyComponent, children: [
      { path: "", component: CompanyDetailComponent },
      { path: "edit", component: CompanyEditComponent },
      {
        path: "coupons", component: CompanyCouponsComponent, children: [
          { path: "", component: CompanyCouponStartComponent },
          { path: "start", component: CompanyCouponStartComponent },
          { path: "new", component: CompanyCouponNewComponent },
          { path: ":id", component: CompanyCouponDetailsComponent },
          { path: ":id/edit", component: CompanyCouponNewComponent },
        ]
      },
    ]
  },

  /* Customer paths: */
  {
    path: "customer", component: CustomerComponent, children: [
      { path: "", component: CustomerDetailComponent },
      { path: "edit", component: CustomerEditComponent },
      {
        path: "coupons", component: CustomerCouponsComponent, children: [
          { path: "", component: CustomerCouponStartComponent },
          { path: ":id", component: CustomerCouponDetailComponent },
        ]
      },
      {
        path: "cart", component: CustomerCartComponent, children: [
          { path: "", component: CustomerCartStartComponent },
          { path: ":id", component: CustomerCartDetailComponent },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor() {
  }
}