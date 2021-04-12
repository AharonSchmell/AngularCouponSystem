import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private loginService: LoginService) { }

  onClickHome() {
    this.router.navigate(["start"], { relativeTo: this.activatedRoute })
  }

  onClickCompany() {
    this.router.navigate(["all-comp"], { relativeTo: this.activatedRoute })
  }

  onClickCustomer() {
    this.router.navigate(["all-cust"], { relativeTo: this.activatedRoute })
  }

  onClickLogout() {
    this.loginService.onLogout(User.ADMIN)
    this.router.navigate(["login"])
  }

  /* A method used to ensure that the navbar buttons do not work 
  while logged in as a different user (customer or company). 
  Forcing the admin to logout when done editing said user*/
  inCustomerOrCompany() {
    return this.router.url.includes("customer") || this.router.url.includes("company")
  }
}