import { Location } from '@angular/common'
import { HttpErrorResponse } from '@angular/common/http'
import { EventEmitter, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Subject } from 'rxjs'
import { CouponsFilter } from '../common/coupons-filter'
import { StorageService } from '../common/storage.service'
import { ErrorStatus } from '../errors/error-status'
import { TokenErrorService } from '../errors/token-error.service'
import { Coupon } from '../models/coupon.model'
import { Customer } from '../models/customer.model'

@Injectable()
export class CustomerService {

    coupons: Coupon[]
    customer: Customer
    token: string
    couponsAmount: number

    errorChannel = new Subject<string>()
    uniqueError = new BehaviorSubject<string>("")
    customerChanged = new EventEmitter<Customer>()
    couponsChanged = new EventEmitter<Coupon[]>()
    couponsAmountChanged = new EventEmitter<number>()

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

    /* Customer methods */
    getCustomer() {
        return new Customer(this.customer.id, this.customer.firstName,
            this.customer.lastName, this.customer.email, this.customer.password);
    }

    onCustomerChanged() {
        this.customerChanged.emit(this.getCustomer())
    }

    getCustomerByToken(token: string) {
        this.storageService.getCustomerByToken(token)
            .subscribe(customer => {
                this.customer = customer
                this.onCustomerChanged()
            }, error => {
                this.checkTokenError(error)
                this.errorChannel.next("There was an error trying to fetch a customer from the cloud")
            })
    }

    updateCustomer(customer: Customer, token: string) {
        this.storageService.updateCustomer(customer, token).
            subscribe((customer: Customer) => {
                this.customer = customer
                this.onCustomerChanged()
            }, error => {
                this.checkTokenError(error)
                this.checkUniqueError(error)
                this.errorChannel.next("There was an error trying to update a customer in the cloud")
            })
    }

    /*Coupon methods */
    getCoupons() {
        return this.coupons.slice();
    }

    onCouponsChanged() {
        this.couponsChanged.emit(this.getCoupons())
    }

    getCouponsAmount() {
        return this.couponsAmount;
    }

    onCouponsAmountChanged() {
        this.couponsAmountChanged.emit(this.getCouponsAmount())
    }

    getCouponById(id: number) {
        return new Coupon(this.coupons[id].id, this.coupons[id].title, this.coupons[id].startDate,
            this.coupons[id].endDate, this.coupons[id].category, this.coupons[id].amount,
            this.coupons[id].description, this.coupons[id].price, this.coupons[id].imageURL)
    }

    /* A method that feches non purchased coupons, sorted by provided filter */
    fetchAllNonPurchasedCoupons(token: string, filter: CouponsFilter) {
        this.storageService.getAllNonPurchasedCoupons(token)
            .subscribe(coupons => {
                if (coupons !== null) {
                    switch (filter) {
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
                this.errorChannel.next("There was an error trying to fetch all coupons from the cloud")
            })
    }

    purchaseCoupon(id: number) {
        //send the coupons actual id to the back end
        this.storageService.purchaseCoupon(this.coupons[id].id, this.token)
            .subscribe((coupon: Coupon) => {
                //update coupon list 
                this.coupons = this.coupons.filter(c => c.id !== coupon.id)
                //emit the changes for the coupon list
                this.onCouponsChanged()
                this.couponsAmount++
                this.onCouponsAmountChanged()
            }, error => {
                this.checkTokenError(error)
                this.errorChannel.next("There was an error trying to purchase a coupon from the cloud")
            })
    }

    fetchAllPurchasedCoupons(token: string) {
        this.storageService.getAllPurchasedCoupons(token)
            .subscribe(coupons => {
                if (coupons !== null) {
                    this.coupons = coupons
                    this.onCouponsChanged()
                }
            }, error => {
                this.checkTokenError(error)
                this.errorChannel.next("There was an error trying to fetch all purchased coupons from the cloud")
            })
    }

    fetchPurchasedCouponsAmount(token: string) {
        this.storageService.getPurchasedCouponsAmount(token)
            .subscribe(couponsAmount => {
                this.couponsAmount = couponsAmount
                this.onCouponsAmountChanged()
            }, error => {
                this.checkTokenError(error)
                this.errorChannel.next("There was an error trying to fetch purchased coupons amount from the cloud")
            })
    }

    cancelPurchasedCoupon(id: number) {
        this.storageService.cancelPurchasedCoupon(this.coupons[id].id, this.token)
            .subscribe((coupon: Coupon) => {
                //update coupon list 
                this.coupons = this.coupons.filter(c => c.id !== coupon.id)
                //emit the changes for the purchased coupon list
                this.onCouponsChanged()
                this.couponsAmount--
                this.onCouponsAmountChanged()
            }, error => {
                this.checkTokenError(error)
                this.errorChannel.next("There was an error trying to cancle the purchase of the coupon in the cloud")
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

    /* A method which checks if the email provided by the customer is unique or not.
       Automatically navigating back to fix the issue. 
       The method takes in an HttpErrorResponse error, and checks the status. 
       A unique error has a unique status*/
    checkUniqueError(error: HttpErrorResponse) {
        if (error.status === ErrorStatus.CONFLICT) {
            this.uniqueError.next("Sorry the email you've provided is already in use")

            /* Navigate back to edit component to fix the error, 
            making sure admin navigation is also possible */
            this._location.forward()
        }
    }
}