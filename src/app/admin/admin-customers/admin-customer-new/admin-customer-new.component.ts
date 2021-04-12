import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-customer-new',
  templateUrl: './admin-customer-new.component.html',
  styleUrls: ['./admin-customer-new.component.css']
})

export class AdminCustomerNewComponent implements OnInit {

  @ViewChild("f") customerForm: NgForm

  customer: Customer = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }

  token: string
  uniqueError: string

  constructor(private adminService: AdminService, private _location: Location) { }

  ngOnInit(): void {
    this.token = this.adminService.getToken()

    /* The email of a customer must be unique - if not, display uniqueError */
    this.adminService.uniqueError.subscribe(uniqueError => {
      this.uniqueError = uniqueError
    })
  }

  onSubmit() {
    this.adminService.addCustomer(this.customer, this.token)
    this._location.back()
  }

  onClearForm() {
    this.customerForm.resetForm()
  }

  onCancleForm() {
    this._location.back()
  }

  onClickDismissError() {
    this.adminService.uniqueError.next("")
  }
}