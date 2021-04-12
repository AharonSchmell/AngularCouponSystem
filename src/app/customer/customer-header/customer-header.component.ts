import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { LoginService } from 'src/app/login/login.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css']
})

export class CustomerHeaderComponent {

  couponAmount: string
  token: string

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private loginService: LoginService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.token = this.customerService.getToken()

    /* In order to display amount of purchased coupons in the header */
    this.customerService.fetchPurchasedCouponsAmount(this.token)
    this.customerService.couponsAmountChanged.subscribe((couponAmount: number) => {
      this.couponAmount = couponAmount.toString()
    })
  }

  onClickCustomer() {
    /* Make sure navigation is possible also for an admin logged in as a customer */
    if (this.inAdmin()) {
      this.router.navigate(["admin/customer"])
    } else {
      this.router.navigate(["customer"])
    }
  }

  onClickCoupons() {
    this.router.navigate(["coupons"], { relativeTo: this.activatedRoute })
  }

  onClickCart() {
    this.router.navigate(["cart"], { relativeTo: this.activatedRoute })
  }

  onClickLogout() {
    this.loginService.onLogout(User.CUSTOMER)
    /* Make sure navigation is possible also for an admin logged in as a customer */
    if (this.inAdmin()) {
      this.router.navigate(["admin/all-cust"])
    } else {
      this.router.navigate(["login"])
    }
  }

  inAdmin() {
    return this.router.url.includes("admin")
  }
}