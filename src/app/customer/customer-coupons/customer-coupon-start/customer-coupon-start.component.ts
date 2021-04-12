import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from '../../customer.service';

@Component({
  selector: 'app-customer-coupon-start',
  templateUrl: './customer-coupon-start.component.html',
  styleUrls: ['./customer-coupon-start.component.css']
})

export class CustomerCouponStartComponent implements OnInit {
  
  customer: Customer = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }

  token: string

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.token = this.customerService.getToken()
    this.customerService.getCustomerByToken(this.token)

    this.customerService.customerChanged.subscribe((customer: Customer) => {
      this.customer = customer
    })
  }
}