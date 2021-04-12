import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Company } from 'src/app/models/company.model';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-company-new',
  templateUrl: './admin-company-new.component.html',
  styleUrls: ['./admin-company-new.component.css']
})

export class AdminCompanyNewComponent implements OnInit {

  @ViewChild("f") companyForm: NgForm

  company: Company = {
    id: 0,
    name: "",
    email: "",
    password: ""
  }

  token: string
  uniqueError: string

  constructor(private adminService: AdminService, private _location: Location) { }

  ngOnInit(): void {
    this.token = this.adminService.getToken()

    /* The name of a company must be unique - if not, display uniqueError */
    this.adminService.uniqueError.subscribe(uniqueError => {
      this.uniqueError = uniqueError
    })
  }

  onSubmit() {
    this.adminService.addCompany(this.company, this.token)
    this._location.back()
  }

  onClearForm() {
    this.companyForm.resetForm()
  }

  onCancleForm() {
    this._location.back()
  }

  onClickDismissError() {
    this.adminService.uniqueError.next("")
  }
}