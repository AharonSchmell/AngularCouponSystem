import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-customer-list',
  templateUrl: './admin-customer-list.component.html',
  styleUrls: ['./admin-customer-list.component.css']
})

export class AdminCustomerListComponent implements OnInit {

  customers: Customer[]
  token: string

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.token = this.adminService.getToken()

    this.adminService.fetchAllCustomers(this.token)
    this.adminService.customersChanged.subscribe((customers: Customer[]) => {
      this.customers = customers
    })
  }

  onNewCustomer() {
    this.router.navigate(["new"], { relativeTo: this.activatedRoute })
  }
}