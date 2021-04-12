import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})

export class CompanyDetailComponent implements OnInit {

  company: Company = {
    id: 0,
    name: "",
    email: "",
    password: ""
  }

  token: string

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.token = this.companyService.getToken()
    this.companyService.getCompanyByToken(this.token)

    this.companyService.companyChanged.subscribe((company: Company) => {
      this.company = company
    })
  }

  onCompanyEdit() {
    this.router.navigate(["edit"], { relativeTo: this.activatedRoute })
  }
}