import { Component, Input } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-admin-customer-item',
  templateUrl: './admin-customer-item.component.html',
  styleUrls: ['./admin-customer-item.component.css']
})
export class AdminCustomerItemComponent {

  @Input() id: number
  @Input() customer: Customer
}