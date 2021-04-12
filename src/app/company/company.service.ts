import { HttpErrorResponse } from "@angular/common/http"
import { EventEmitter, Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { BehaviorSubject, Subject } from "rxjs"
import { CouponsFilter } from "../common/coupons-filter"
import { StorageService } from "../common/storage.service"
import { ErrorStatus } from "../errors/error-status"
import { TokenErrorService } from "../errors/token-error.service"
import { Company } from "../models/company.model"
import { Coupon } from "../models/coupon.model"
import { Location } from '@angular/common';


@Injectable()
export class CompanyService {

    coupons: Coupon[] = []
    company: Company
    token: string

    couponsChanged = new EventEmitter<Coupon[]>()
    companyChanged = new EventEmitter<Company>()
    errorChannel = new Subject<string>()
    uniqueError = new BehaviorSubject<string>("")

    constructor(private storageService: StorageService, private router: Router, private tokenErrorService: TokenErrorService,
        private _location: Location) {
    }

    /* Token methods */
    onTokenRecieved(token: string) {
        this.token = token
    }

    getToken() {
        return this.token
    }


    /* Company methods */
    getCompany() {
        return new Company(this.company.id, this.company.name,
            this.company.email, this.company.password);
    }

    onCompanyChanged() {
        this.companyChanged.emit(this.getCompany())
    }

    getCompanyByToken(token: string) {
        this.storageService.getCompanyByToken(token)
            .subscribe(company => {
                this.company = company
                this.onCompanyChanged()
            }, error => {
                this.checkTokenError(error)
                this.errorChannel.next("There was an error trying to fetch a company from the cloud")
            })
    }

    updateCompany(company: Company, token: string) {
        this.storageService.updateCompany(company, token).
            subscribe((company: Company) => {
                this.company = company
                this.onCompanyChanged()
            }, error => {
                this.checkTokenError(error)
                this.checkUniqueError(error)
                this.errorChannel.next("There was an error trying to fetch a company from the cloud")
            })
    }

    /* Company coupon methods */
    getCoupons() {
        return this.coupons.slice();
    }

    onCouponsChanged() {
        this.couponsChanged.emit(this.getCoupons())
    }

    /* A method that feches company coupons, sorted by provided filter */
    fetchCompanyCoupons(token: string, filter: CouponsFilter) {
        this.storageService.getCompanyCoupons(token)
            .subscribe(coupons => {
                if (coupons !== null) {
                    switch (filter) {
                        case (CouponsFilter.MOST_SOLD):
                            this.coupons = coupons //Most sold sort is the default sort -which is done in the server.
                            break;
                        case (CouponsFilter.ABC):
                            this.coupons = coupons.sort((c1, c2) => c1.title.localeCompare(c2.title))
                            break;
                        case (CouponsFilter.START_DATE):
                            this.coupons = coupons.sort((c1, c2) => new Date(c1.startDate).getTime() - new Date(c2.startDate).getTime())
                            break;
                        case (CouponsFilter.END_DATE):
                            this.coupons = coupons.sort((c1, c2) => new Date(c1.endDate).getTime() - new Date(c2.endDate).getTime())
                            break;
                        case (CouponsFilter.PRICE_ASCENDING):
                            this.coupons = coupons.sort((c1, c2) => +c1.price < +c2.price ? -1 : 1)
                            break;
                        case (CouponsFilter.PRICE_DESCENDING):
                            this.coupons = coupons.sort((c1, c2) => +c1.price > +c2.price ? -1 : 1)
                            break;
                    }
                    this.onCouponsChanged()
                }
            }, error => {
                this.checkTokenError(error)
                this.errorChannel.next("There was an error trying to fetch company coupons from the cloud")
            })
    }

    addCoupon(coupon: Coupon, token: string) {
        this.storageService.addCoupon(coupon, token)
            .subscribe(coupon => {
                this.coupons.unshift(coupon)
                this.onCouponsChanged()
            }, error => {
                this.checkTokenError(error)
                this.checkUniqueError(error)
                this.errorChannel.next("There was an error trying to add a coupon in the cloud")
            })
    }

    updateCoupon(id: number, coupon: Coupon, token: string) {
        this.storageService.updateCoupon(coupon, token)
            .subscribe((coupon: Coupon) => {
                this.coupons[id] = coupon
                this.onCouponsChanged()
            }, error => {
                this.checkTokenError(error)
                this.checkUniqueError(error)
                this.errorChannel.next("There was an error trying to update a coupon in the cloud")
            })
    }

    getCouponById(id: number) {
        return new Coupon(this.coupons[id].id, this.coupons[id].title,
            this.coupons[id].startDate, this.coupons[id].endDate,
            this.coupons[id].category, this.coupons[id].amount, this.coupons[id].description,
            this.coupons[id].price, this.coupons[id].imageURL)
    }

    deleteCoupon(id: number, token: string) {
        this.storageService.deleteCoupon(id, token)
            .subscribe(() => {
                this.coupons = this.coupons.filter(coupon => coupon.id !== id)
                this.onCouponsChanged()
            }, error => {
                this.checkTokenError(error)
                this.errorChannel.next("There was an error trying to delete a coupon in the cloud")
            })
    }

    /* A method which checks the validity of the token in every one of the CRUD methods
    whith the purpose of automatically logging out a user if the token is broken */
    checkTokenError(error: HttpErrorResponse) {
        if (error.status == ErrorStatus.UNAUTHORIZED) {
            this.tokenErrorService.errorChannel.next("Sorry.. you need to login again")
            this.router.navigate(["login"]);
        }
    }

    /* A method which checks if the name of company or title of coupon
     provided by the user is unique or not. Automatically navigating back to fix the issue.
     The method takes in an HttpErrorResponse error, and checks the status. 
    A unique error has a unique status*/
    checkUniqueError(error: HttpErrorResponse) {
        if (error.status === ErrorStatus.CONFLICT) {
            if (this.router.url.includes("coupons")) {
                this.uniqueError.next("Sorry the title you've provided is already in use")
                this._location.back()
            } else {
                this.uniqueError.next("Sorry the name you've provided is already in use")
                this._location.forward()
            }
        }
    }
}