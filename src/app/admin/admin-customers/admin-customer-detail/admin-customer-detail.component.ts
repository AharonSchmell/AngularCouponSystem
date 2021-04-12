import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { Customer } from 'src/app/models/customer.model';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-customer-detail',
  templateUrl: './admin-customer-detail.component.html',
  styleUrls: ['./admin-customer-detail.component.css']
})

export class AdminCustomerDetailComponent implements OnInit {

  customer: Customer = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }

  token: string
  deleteClicked: boolean

  constructor(private router: Router, private adminService: AdminService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.token = this.adminService.getToken()

    this.activatedRoute.params.subscribe((params: Params) => {
      this.customer = this.adminService.getCustomerById(+params["id"])
    })
  }

  onDelete() {
    this.adminService.deleteCustomer(this.customer.id)
    this.router.navigate(["admin/all-cust"])
  }

  onCustomerLogin() {
    this.adminService.loginAsCustomer(this.customer.email, this.customer.password, User[User.CUSTOMER])//User[User.CUSTOMER]=="CUSTOMER"
  }

  deleteClickedToggle() {
    this.deleteClicked = !this.deleteClicked
  }
}