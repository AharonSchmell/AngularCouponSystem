import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon.model';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'app-company-coupon-details',
  templateUrl: './company-coupon-details.component.html',
  styleUrls: ['./company-coupon-details.component.css']
})

export class CompanyCouponDetailsComponent implements OnInit {

  coupon: Coupon = {
    id: 0,
    title: "",
    startDate: "",
    endDate: "",
    category: "",
    amount: "",
    description: "",
    price: "",
    imageURL: ""
  }

  token: string
  deleteClicked: boolean
  startDate: string
  endDate: string
  price: string

  constructor(private _location: Location, private router: Router, private companyService: CompanyService,
    private activatedRoute: ActivatedRoute) { }
    
  ngOnInit(): void {
    this.token = this.companyService.getToken()

    this.activatedRoute.params.subscribe((params: Params) => {
      this.coupon = this.companyService.getCouponById(+params["id"])

      /* 10/3/2021T00:00 => 10/3/2021 */
      this.startDate = new Date(this.coupon.startDate).toLocaleDateString()
      this.endDate = new Date(this.coupon.endDate).toLocaleDateString()

      /* 1000000 => 1,000,000 */
      this.price = this.coupon.price.toLocaleString()
    })
  }

  onDelete() {
    this.companyService.deleteCoupon(this.coupon.id, this.token)
    this._location.back()
  }

  onEdit() {
    this.router.navigate(["edit"], { relativeTo: this.activatedRoute })
  }

  deleteClickedToggle() {
    this.deleteClicked = !this.deleteClicked
  }
}