import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon.model';
import { CustomerService } from '../../customer.service';

@Component({
  selector: 'app-customer-cart-detail',
  templateUrl: './customer-cart-detail.component.html',
  styleUrls: ['./customer-cart-detail.component.css']
})

export class CustomerCartDetailComponent implements OnInit {

  coupon: Coupon = {
    id: 0,
    title: "",
    startDate: "",
    endDate: "",
    category: "",
    amount: "",
    description: "",
    price: "",
    imageURL: ""
  }

  token: string
  id: number
  startDate: string
  endDate: string
  price: string

  constructor(private _location: Location, private customerService: CustomerService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.token = this.customerService.getToken()

    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params["id"]
      this.coupon = this.customerService.getCouponById(this.id)

      /* 10/3/2021T00:00 => 10/3/2021 */
      this.startDate = new Date(this.coupon.startDate).toLocaleDateString()
      this.endDate = new Date(this.coupon.endDate).toLocaleDateString()

      /* 1000000 => 1,000,000 */
      this.price = this.coupon.price.toLocaleString()

    })
  }

  onCancelPurchase() {
    this.customerService.cancelPurchasedCoupon(this.id)
    this._location.back()
  }
}