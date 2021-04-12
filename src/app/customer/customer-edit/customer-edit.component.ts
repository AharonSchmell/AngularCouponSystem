import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})

export class CustomerEditComponent implements OnInit {

  @ViewChild("f") customerForm: NgForm

  customer: Customer = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }

  uniqueError: string
  token: string

  constructor(private customerService: CustomerService, private _location: Location) { }

  ngOnInit(): void {
    this.token = this.customerService.getToken()
    this.customerService.getCustomerByToken(this.token)

    this.customerService.customerChanged.subscribe((customer: Customer) => {
      this.customer = customer
    })

    /* Subscribe to a case where the email provided by the customer is not unique */
    this.customerService.uniqueError.subscribe(uniqueError => {
      this.uniqueError = uniqueError
    })
  }

  onSubmit() {
    this.customerService.updateCustomer(this.customer, this.token)
    this._location.back()
  }

  onClearForm() {
    this.customerForm.resetForm()
  }

  onCancleForm() {
    this._location.back()
  }

  onClickDismissError() {
    this.customerService.uniqueError.next("")
  }
}