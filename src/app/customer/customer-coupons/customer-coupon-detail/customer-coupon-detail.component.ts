import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon.model';
import { CustomerService } from '../../customer.service';

@Component({
  selector: 'app-customer-coupon-detail',
  templateUrl: './customer-coupon-detail.component.html',
  styleUrls: ['./customer-coupon-detail.component.css']
})

export class CustomerCouponDetailComponent implements OnInit {

  coupon: Coupon
  id: number
  startDate: string
  endDate: string
  price: string

  constructor(private route: ActivatedRoute, private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"]
      this.coupon = this.customerService.getCouponById(this.id)

      /* 10/3/2021T00:00 => 10/3/2021 */
      this.startDate = new Date(this.coupon.startDate).toLocaleDateString()
      this.endDate = new Date(this.coupon.endDate).toLocaleDateString()
      
      /* 1000000 => 1,000,000 */
      this.price = this.coupon.price.toLocaleString()
    })
  }

  onPurchase() {
    this.customerService.purchaseCoupon(this.id)
    /* Make sure navigation is possible also for an admin logged in as a customer */
    if (this.router.url.includes("admin")) {
      this.router.navigate(["admin/customer/coupons"])
    } else {
      this.router.navigate(["customer/coupons"])
    }
  }

  onCancle() {
    /* Make sure navigation is possible also for an admin logged in as a customer */
    if (this.router.url.includes("admin")) {
      this.router.navigate(["admin/customer/coupons"])
    } else {
      this.router.navigate(["customer/coupons"])
    }
  }

  amountZero() {
    return this.coupon.amount == "0"
  }
}