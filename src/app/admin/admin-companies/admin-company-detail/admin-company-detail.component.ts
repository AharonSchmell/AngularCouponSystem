import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { Company } from 'src/app/models/company.model';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-company-detail',
  templateUrl: './admin-company-detail.component.html',
  styleUrls: ['./admin-company-detail.component.css']
})

export class AdminCompanyDetailComponent implements OnInit {

  company: Company = {
    id: 0,
    name: "",
    email: "",
    password: ""
  }

  token: string
  deleteClicked: boolean

  constructor(private router: Router, private adminService: AdminService, private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.token = this.adminService.getToken()

    this.activatedRoute.params.subscribe((params: Params) => {
      this.company = this.adminService.getCompanyById(+params["id"])
    })
  }

  onDelete() {
    this.adminService.deleteCompany(this.company.id)
    this.router.navigate(["admin/all-comp"])
  }

  onCompanyLogin() {
    this.adminService.loginAsCompany(this.company.email, this.company.password, User[User.COMPANY])//User[User.COMPANY] == "COMPANY" 
  }

  deleteClickedToggle() {
    this.deleteClicked = !this.deleteClicked
  }
}