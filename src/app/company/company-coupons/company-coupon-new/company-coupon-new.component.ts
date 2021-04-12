import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon.model';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'app-company-coupon-new',
  templateUrl: './company-coupon-new.component.html',
  styleUrls: ['./company-coupon-new.component.css']
})

export class CompanyCouponNewComponent implements OnInit {

  @ViewChild("f") customerForm: NgForm

  coupon: Coupon = {
    id: 0,
    title: "",
    startDate: "",
    endDate: "",
    category: "",
    amount: "",
    description: "",
    price: "",
    imageURL: "",
  }

  token: string
  id: number
  editMode: boolean
  uniqueError: string

  constructor(private companyService: CompanyService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.token = this.companyService.getToken()

    /* The companent surves two purposes: add / edit a coupon.
    Check if edit mode must be turned on, if so get the coupon being edited*/
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params["id"]
      this.editMode = params["id"] != null
    })

    if (this.editMode) {
      this.coupon = this.companyService.getCouponById(this.id)
    }

    /* Subscribe to a case where the company coupon title provided is not unique */
    this.companyService.uniqueError.subscribe(uniqueError => {
      this.uniqueError = uniqueError
    })
  }

  onSubmit() {
    /* submit according to the components purpose */
    if (this.editMode) {
      this.companyService.updateCoupon(this.id, this.coupon, this.token)
    } else {
      this.companyService.addCoupon(this.coupon, this.token)
    }
    /* Make sure navigation is possible also for an admin logged in as a company */
    if (this.router.url.includes("admin")) {
      this.router.navigate(["admin/company/coupons"])
    } else {
      this.router.navigate(["company/coupons"])
    }
  }

  onClearForm() {
    this.customerForm.resetForm()
  }

  onCancleForm() {
    /* Make sure navigation is possible also for an admin logged in as a company */
    if (this.router.url.includes("admin")) {
      this.router.navigate(["admin/company/coupons"])
    } else {
      this.router.navigate(["company/coupons"])
    }
  }

  onClickDismissError() {
    this.companyService.uniqueError.next("")
  }
}