import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon.model';
import { CustomerService } from '../../customer.service';

@Component({
  selector: 'app-customer-cart-list',
  templateUrl: './customer-cart-list.component.html',
  styleUrls: ['./customer-cart-list.component.css']
})
export class CustomerCartListComponent implements OnInit {

  coupons: Coupon[] = []
  token: string


  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.token = this.customerService.getToken()

    this.customerService.fetchAllPurchasedCoupons(this.token)
    this.customerService.couponsChanged.subscribe((coupons: Coupon[]) => {
      this.coupons = coupons
    })
  }
  
  couponListEmpty() {
    return this.coupons.length == 0
  }
}