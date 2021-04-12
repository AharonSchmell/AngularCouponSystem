import { Component, Input } from '@angular/core';
import { CompanyService } from 'src/app/company/company.service';
import { Coupon } from 'src/app/models/coupon.model';
import { ImagesUrl } from 'src/images/imagesUrl';

@Component({
  selector: 'app-company-coupon-item',
  templateUrl: './company-coupon-item.component.html',
  styleUrls: ['./company-coupon-item.component.css']
})

export class CompanyCouponItemComponent {

  @Input() id: number
  @Input() coupon: Coupon

  token: string
  price: string

  constructor(private companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.token = this.companyService.getToken()

    /* 1000000 => 1,000,000 */
    this.price = this.coupon.price.toLocaleString()
  }

  /* A method which will ensure, in a case where an invalid url is given,
   that a default coupon imace url will take its place */
  changeToDefault() {
    this.coupon.imageURL = ImagesUrl.DEFAULT_COUPON
    this.companyService.updateCoupon(this.id, this.coupon, this.token)
  }
}