import { Component, OnInit } from '@angular/core';
import { CouponsFilter } from 'src/app/common/coupons-filter';
import { Coupon } from 'src/app/models/coupon.model';
import { CustomerService } from '../../customer.service';

@Component({
  selector: 'app-customer-coupon-list',
  templateUrl: './customer-coupon-list.component.html',
  styleUrls: ['./customer-coupon-list.component.css']
})

export class CustomerCouponListComponent implements OnInit {

  coupons: Coupon[] = []
  token: string

  constructor(private customerService: CustomerService) { }
  ngOnInit(): void {
    this.token = this.customerService.getToken()

    this.customerService.fetchAllNonPurchasedCoupons(this.token, CouponsFilter.ABC)// Default coupons by a-z
    this.customerService.couponsChanged.subscribe((coupons: Coupon[]) => {
      this.coupons = coupons
    })
  }

  couponListEmpty() {
    return this.coupons.length == 0
  }

  /* sorting methods: */
  onClickCouponsAbc() {
    this.customerService.fetchAllNonPurchasedCoupons(this.token, CouponsFilter.ABC)
  }

  onClickCouponsStartDate() {
    this.customerService.fetchAllNonPurchasedCoupons(this.token, CouponsFilter.START_DATE)
  }

  onClickCouponsEndDate() {
    this.customerService.fetchAllNonPurchasedCoupons(this.token, CouponsFilter.END_DATE)
  }

  onClickCouponsPriceAscending() {
    this.customerService.fetchAllNonPurchasedCoupons(this.token, CouponsFilter.PRICE_ASCENDING)
  }

  onClickCouponsPriceDescending() {
    this.customerService.fetchAllNonPurchasedCoupons(this.token, CouponsFilter.PRICE_DESCENDING)
  }
}