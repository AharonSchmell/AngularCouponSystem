import { Component, Input } from '@angular/core';
import { Coupon } from 'src/app/models/coupon.model';

@Component({
  selector: 'app-customer-cart-item',
  templateUrl: './customer-cart-item.component.html',
  styleUrls: ['./customer-cart-item.component.css']
})

export class CustomerCartItemComponent {

  @Input() id: number
  @Input() coupon: Coupon

  price: string

  ngOnInit(): void {
    /* 1000000 => 1,000,000 */
    this.price = this.coupon.price.toLocaleString()
  }
}
