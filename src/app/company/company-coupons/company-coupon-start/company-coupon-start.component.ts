import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'app-company-coupon-start',
  templateUrl: './company-coupon-start.component.html',
  styleUrls: ['./company-coupon-start.component.css']
})

export class CompanyCouponStartComponent implements OnInit {

  company: Company = {
    id: 0,
    name: "",
    email: "",
    password: ""
  }

  token: string

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.token = this.companyService.getToken()
    this.companyService.getCompanyByToken(this.token)

    this.companyService.companyChanged.subscribe((company: Company) => {
      this.company = company
    })
  }
}