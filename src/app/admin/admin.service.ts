import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { StorageService } from "../common/storage.service";
import { User } from "../common/user";
import { CompanyService } from "../company/company.service";
import { CustomerService } from "../customer/customer.service";
import { ErrorStatus } from "../errors/error-status";
import { TokenErrorService } from "../errors/token-error.service";
import { Company } from "../models/company.model";
import { Customer } from "../models/customer.model";

@Injectable()
export class AdminService {

    companies: Company[] = []
    customers: Customer[] = []
    token: string

    uniqueError = new BehaviorSubject<string>("")
    errorChannel = new Subject<String>()
    tokenRecieved = new EventEmitter<String>()
    customersChanged = new EventEmitter<Customer[]>()
    companiesChanged = new EventEmitter<Company[]>()

    constructor(private storageService: StorageService, private customerService: CustomerService, private router: Router,
        private companyService: CompanyService, private tokenErrorService: TokenErrorService, private _location: Location) {
    }

    /* Token methods */
    onTokenRecieved(token: string) {
        this.token = token
    }

    getToken() {
        return this.token
    }

    /* Admin-customer methods*/
    getCustomers() {
        return this.customers.slice();
    }

    onCustomersChanged() {
        this.customersChanged.emit(this.getCustomers())
    }

    fetchAllCustomers(token: string) {
        this.storageService.getAllCustomers(token)
            .subscribe(customers => {
                if (customers !== null) {
                    this.customers = customers
                    this.onCustomersChanged()
                }
            }, error => {
                this.checkTokenError(error)
                this.errorChannel.next("There was an error trying to fetch all the customers")
            })
    }

    loginAsCustomer(email: string, password: string, user: User) {
        this.storageService.login(email, password, user)
            .subscribe(token => {
                this.customerService.onTokenRecieved(token.tokenName)
                this.router.navigate(["/admin/customer"])
            }, error => {
                this.checkTokenError(error)
                this.errorChannel.next("customer login error")
            })
    }

    addCustomer(customer: Customer, token: string) {
        this.storageService.addCustomer(customer, token)
            .subscribe(customer => {
                this.customers.unshift(customer)
                this.onCustomersChanged()
            }, error => {
                this.checkTokenError(error)
                this.checkUniqueError(error)
                this.errorChannel.next("Something went wrong adding a customer!")
            })
    }

    deleteCustomer(id: number) {
        this.storageService.deleteCustomer(id, this.token)
            .subscribe(() => {
                this.customers = this.customers.filter(customer => customer.id !== id)
                this.onCustomersChanged()
            }, error => {
                this.checkTokenError(error)
                this.errorChannel.next("There was an error deleting a customer!")
            })
    }

    getCustomerById(id: number) {
        return new Customer(this.customers[id].id, this.customers[id].firstName, this.customers[id].lastName,
            this.customers[id].email, this.customers[id].password)
    }

    /* Admin-company methods */
    getCompanies() {
        return this.companies.slice();
    }

    onCompaniesChanged() {
        this.companiesChanged.emit(this.getCompanies())
    }

    fetchAllCompanies(token: string) {
        this.storageService.getAllCompanies(token)
            .subscribe(companies => {
                if (companies !== null) {
                    this.companies = companies
                    this.onCompaniesChanged()
                }
            }, error => {
                this.checkTokenError(error)
                this.errorChannel.next("There was an error trying to fetch all of the companies")
            })
    }

    loginAsCompany(email: string, password: string, user: User) {
        this.storageService.login(email, password, user)
            .subscribe(token => {
                this.companyService.onTokenRecieved(token.tokenName)
                this.router.navigate(["/admin/company"])
            }, error => {
                this.checkTokenError(error)
                this.errorChannel.next("company login error")
            })
    }

    deleteCompany(id: number) {
        this.storageService.deleteCompany(id, this.token)
            .subscribe(() => {
                this.companies = this.companies.filter(company => company.id !== id)
                this.onCompaniesChanged()
            }, error => {
                this.checkTokenError(error)
                this.errorChannel.next("There was an error deleting a company!")
            })
    }

    addCompany(company: Company, token: string) {
        this.storageService.addCompany(company, token)
            .subscribe(company => {
                this.companies.unshift(company)
                this.onCompaniesChanged()
            }, error => {
                this.checkTokenError(error)
                this.checkUniqueError(error)
                this.errorChannel.next("Something went wrong adding a company!")
            })
    }

    getCompanyById(id: number) {
        return new Company(this.companies[id].id, this.companies[id].name, this.companies[id].email,
            this.companies[id].password)
    }

    /* A method which checks the validity of the token in every one of the CRUD methods
    whith the purpose of automatically logging out a user if the token is invalid */
    checkTokenError(error: HttpErrorResponse) {
        if (error.status == ErrorStatus.UNAUTHORIZED) {
            this.tokenErrorService.errorChannel.next("Sorry.. you need to login again")
            this.router.navigate(["login"]);
        }
    }

    /* A method which checks if the name of a company or name of a customer 
    provided by the user is unique or not. Automatically navigating back to fix the issue.
    The method takes in an HttpErrorResponse error, and checks the status. 
    A unique error has a unique status*/
    checkUniqueError(error: HttpErrorResponse) {
        if (error.status === ErrorStatus.CONFLICT) {
            if (this.router.url.includes("all-cust")) {
                this.uniqueError.next("Sorry the customer name you've provided is already in use")
            } else {
                this.uniqueError.next("Sorry the company name you've provided is already in use")
            }
            this._location.forward()
        }
    }
}