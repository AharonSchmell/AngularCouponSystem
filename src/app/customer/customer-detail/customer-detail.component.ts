import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})

export class CustomerDetailComponent implements OnInit {
  customer: Customer = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }

  token: string

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.token = this.customerService.getToken()
    this.customerService.getCustomerByToken(this.token)

    this.customerService.customerChanged.subscribe((customer: Customer) => {
      this.customer = customer
    })
  }

  onCustomerEdit() {
    this.router.navigate(["edit"], { relativeTo: this.activatedRoute })
  }
}