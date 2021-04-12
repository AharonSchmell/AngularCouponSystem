import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon.model';
import { CustomerService } from '../../../customer.service';

@Component({
  selector: 'app-customer-coupon-item',
  templateUrl: './customer-coupon-item.component.html',
  styleUrls: ['./customer-coupon-item.component.css']
})

export class CustomerCouponItemComponent {

  @Input() id: number
  @Input() coupon: Coupon

  price: string

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    /* 1000000 => 1,000,000 */
    this.price = this.coupon.price.toLocaleString()
  }

  onCancelPurchase() {
    this.customerService.cancelPurchasedCoupon(this.id)
  }

  amountZero() {
    return this.coupon.amount == "0"
  }

  /* A method that checks if the coupon will expire within a week or less*/
  expiresInAWeek() {
    let endDate = new Date(this.coupon.endDate)

    let inAWeek = new Date()
    inAWeek.setDate(inAWeek.getDate() + 7)

    return endDate.getTime() < inAWeek.getTime()
  }
}