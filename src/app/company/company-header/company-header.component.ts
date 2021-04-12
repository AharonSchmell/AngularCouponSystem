import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-company-header',
  templateUrl: './company-header.component.html',
  styleUrls: ['./company-header.component.css']
})

export class CompanyHeaderComponent {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private loginService: LoginService) { }

  onClickCompany() {
    if (this.inAdmin()) {
      /* Make sure navigation is possible also for an admin logged in as a company */
      this.router.navigate(["admin/company"])
    } else {
      this.router.navigate(["company"])
    }
  }

  onClickCoupons() {
    this.router.navigate(["coupons"], { relativeTo: this.activatedRoute })
  }

  onClickLogout() {
    this.loginService.onLogout(User.COMPANY)
    /* Make sure navigation is possible also for an admin logged in as a company */
    if (this.inAdmin()) {
      this.router.navigate(["admin/all-comp"])
    } else {
      this.router.navigate(["login"])
    }
  }

  inAdmin() {
    return this.router.url.includes("admin")
  }
}