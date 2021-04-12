import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { AdminService } from '../admin/admin.service'
import { StorageService } from '../common/storage.service'
import { User } from '../common/user'
import { CompanyService } from '../company/company.service'
import { CustomerService } from '../customer/customer.service'

@Injectable()
export class LoginService {
    errorChannel = new Subject<string>()

    constructor(private storageService: StorageService, private router: Router, private adminService: AdminService,
        private companyService: CompanyService, private customerService: CustomerService) {
    }

    /* A method used to login as one of three different users, 
    sends the token recieved to the relevant service and nvigates accordingly */
    onLogin(email: string, password: string, user: User) {
        this.storageService.login(email, password, user)
            .subscribe(token => {
                switch (user) {
                    case User[User.ADMIN]:
                        this.adminService.onTokenRecieved(token.tokenName)
                        this.router.navigate(["/admin"])
                        break;
                    case User[User.CUSTOMER]:
                        this.customerService.onTokenRecieved(token.tokenName)
                        this.router.navigate(["/customer"])
                        break;
                    case User[User.COMPANY]:
                        this.companyService.onTokenRecieved(token.tokenName)
                        this.router.navigate(["/company"])
                        break;
                }
            }, error => {
                this.errorChannel.next("login error - check credentials")
            })
    }

    /* A method used to clean up and log out of, the relevant services */
    onLogout(user: User) {
        let token = ""
        switch (user) {
            case (User.ADMIN):
                this.adminService.companies = []
                this.adminService.customers = []
                token = this.adminService.getToken()
                break;
            case (User.CUSTOMER):
                this.customerService.coupons = []
                token = this.customerService.getToken()
                break;
            case (User.COMPANY):
                this.companyService.coupons = []
                token = this.companyService.getToken()
                break;
        }

        this.storageService.logout(token).subscribe(() => {
        }, error => {
            /* Ignore error */
        })
    }
}