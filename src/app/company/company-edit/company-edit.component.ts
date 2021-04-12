import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})

export class CompanyEditComponent implements OnInit {

  @ViewChild("f") companyForm: NgForm

  company: Company = {
    id: 0,
    name: "",
    email: "",
    password: ""
  }

  uniqueError: string
  token: string

  constructor(private _location: Location, private activatedRoute: ActivatedRoute, private router: Router, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.token = this.companyService.getToken()
    this.companyService.getCompanyByToken(this.token)

    this.companyService.companyChanged.subscribe((company: Company) => {
      this.company = company
    })

    /* Subscribe to a case where the company name provided is not unique */
    this.companyService.uniqueError.subscribe(uniqueError => {
      this.uniqueError = uniqueError
    })
  }

  onSubmit() {
    this.companyService.updateCompany(this.company, this.token)
     this._location.back()
  }

  onClearForm() {
    this.companyForm.resetForm()
  }

  onCancleForm() {
    this._location.back()
  }

  onClickDismissError() {
    this.companyService.uniqueError.next("")
  }
}