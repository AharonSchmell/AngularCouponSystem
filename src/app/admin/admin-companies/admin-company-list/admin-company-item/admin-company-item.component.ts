import { Component, Input} from '@angular/core';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-admin-company-item',
  templateUrl: './admin-company-item.component.html',
  styleUrls: ['./admin-company-item.component.css']
})

export class AdminCompanyItemComponent {

  @Input() id: number
  @Input() company: Company
}