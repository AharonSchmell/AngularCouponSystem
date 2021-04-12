import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponsFilter } from 'src/app/common/coupons-filter';
import { Coupon } from 'src/app/models/coupon.model';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'app-company-coupon-list',
  templateUrl: './company-coupon-list.component.html',
  styleUrls: ['./company-coupon-list.component.css']
})

export class CompanyCouponListComponent implements OnInit {

  coupons: Coupon[] = []
  token: string

  constructor(private companyService: CompanyService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.token = this.companyService.getToken()

    this.companyService.fetchCompanyCoupons(this.token, CouponsFilter.MOST_SOLD)//default coupons by most sold
    this.companyService.couponsChanged.subscribe((coupons: Coupon[]) => {
      this.coupons = coupons
    })
  }

  onClickAddCoupon() {
    this.router.navigate(["new"], { relativeTo: this.activatedRoute })
  }

  /* sorting methods: */
  onClickCouponsMostSold() {
    this.companyService.fetchCompanyCoupons(this.token, CouponsFilter.MOST_SOLD)
  }

  onClickCouponsAbc() {
    this.companyService.fetchCompanyCoupons(this.token, CouponsFilter.ABC)
  }

  onClickCouponsStartDate() {
    this.companyService.fetchCompanyCoupons(this.token, CouponsFilter.START_DATE)
  }

  onClickCouponsEndDate() {
    this.companyService.fetchCompanyCoupons(this.token, CouponsFilter.END_DATE)
  }

  onClickCouponsPriceAscending() {
    this.companyService.fetchCompanyCoupons(this.token, CouponsFilter.PRICE_ASCENDING)
  }

  onClickCouponsPriceDescending() {
    this.companyService.fetchCompanyCoupons(this.token, CouponsFilter.PRICE_DESCENDING)
  }

  couponListEmpty() {
    return this.coupons.length == 0
  }
}