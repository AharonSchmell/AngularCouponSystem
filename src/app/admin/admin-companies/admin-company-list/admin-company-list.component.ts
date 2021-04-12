import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-company-list',
  templateUrl: './admin-company-list.component.html',
  styleUrls: ['./admin-company-list.component.css']
})

export class AdminCompanyListComponent implements OnInit {

  companies: Company[]
  token: string

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.token = this.adminService.getToken()

    this.adminService.fetchAllCompanies(this.token)
    this.adminService.companiesChanged.subscribe((companies: Company[]) => {
      this.companies = companies
    })
  }

  onNewCompany() {
    this.router.navigate(["new"], { relativeTo: this.activatedRoute })
  }
}