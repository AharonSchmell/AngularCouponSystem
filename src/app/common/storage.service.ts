import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Token } from "../models/token.model";
import { Customer } from "../models/customer.model";
import { Coupon } from "../models/coupon.model";
import { Company } from "../models/company.model";
import { User } from "./user";

@Injectable()
export class StorageService {

    constructor(private http: HttpClient) {
    }

    /* Login methods: */
    login(email: string, password: string, user: User) {
        let params = new HttpParams()
            .set("email", email)
            .set("password", password)
            .set("stringLoginType", user)

        return this.http.post<Token>("http://localhost:8080/api/login", params)
    }

    logout(token: string) {
        let params = new HttpParams()
            .set("token", token)
        return this.http.post<void>("http://localhost:8080/api/logout", params)
    }

    /* Customer methods: */
    getCustomerByToken(token: string) {
        let params = new HttpParams()
            .set("token", token)
        return this.http.get<Customer>("http://localhost:8080/api/customers/token", { params: params })
    }

    updateCustomer(customer: Customer, token: string) {
        let params = new HttpParams()
            .set("token", token)
        return this.http.post<Customer>("http://localhost:8080/api/customers/update", customer, { params: params })
    }

    getAllNonPurchasedCoupons(token: string) {
        let params = new HttpParams()
            .set("token", token)
        return this.http.get<Coupon[]>("http://localhost:8080/api/customers/coupons/all", { params: params })
    }

    getAllPurchasedCoupons(token: string) {
        let params = new HttpParams()
            .set("token", token)
        return this.http.get<Coupon[]>("http://localhost:8080/api/customers/coupons", { params: params })
    }

    getPurchasedCouponsAmount(token: string){
        let params = new HttpParams()
        .set("token", token)
    return this.http.get<number>("http://localhost:8080/api/customers/coupons/amount", { params: params })
    }

    purchaseCoupon(id: number, token: string) {
        let params = new HttpParams()
            .set("couponId", id.toString())
            .set("token", token)
        return this.http.post<Coupon>("http://localhost:8080/api/customers/coupons/purchase", params)
    }
    cancelPurchasedCoupon(id: number, token: string) {
        let params = new HttpParams()
            .set("couponId", id.toString())
            .set("token", token)
        return this.http.post<Coupon>("http://localhost:8080/api/customers/coupons/purchase/cancel", params)
    }

    /* Company methods: */
    getCompanyByToken(token: string) {
        let params = new HttpParams()
            .set("token", token)
        return this.http.get<Company>("http://localhost:8080/api/companies/token", { params: params })
    }

    updateCompany(company: Company, token: string) {
        let params = new HttpParams()
            .set("token", token)
        return this.http.post<Company>("http://localhost:8080/api/companies/update", company, { params: params })
    }

    getCompanyCoupons(token: string) {
        let params = new HttpParams()
            .set("token", token)
        return this.http.get<Coupon[]>("http://localhost:8080/api/companies/coupons", { params: params })
    }

    addCoupon(coupon: Coupon, token: string) {
        let params = new HttpParams()
            .set("token", token)
        return this.http.post<Coupon>("http://localhost:8080/api/companies/coupons/add", coupon, { params: params })
    }

    updateCoupon(coupon: Coupon, token: string) {
        let params = new HttpParams()
            .set("token", token)
        return this.http.post<Coupon>("http://localhost:8080/api/companies/coupons/update", coupon, { params: params })
    }

    deleteCoupon(id: number, token: string) {
        let params = new HttpParams()
            .set("token", token)
        return this.http.delete<void>("http://localhost:8080/api/companies/coupons/" + id.toString(), { params: params })
    }

    /* Admin methods */
    getAllCustomers(token: string) {
        let params = new HttpParams()
            .set("token", token)
        return this.http.get<Customer[]>("http://localhost:8080/api/admin/customers", { params: params })
    }

    deleteCustomer(id: number, token: string) {
        let params = new HttpParams()
            .set("token", token)
        return this.http.delete<void>("http://localhost:8080/api/admin/customers/" + id.toString(), { params: params })
    }

    addCustomer(customer: Customer, token: string) {
        let params = new HttpParams()
            .set("token", token)
        return this.http.post<Customer>("http://localhost:8080/api/admin/customers/add", customer, { params: params })
    }

    getAllCompanies(token: string) {
        let params = new HttpParams()
            .set("token", token)
        return this.http.get<Company[]>("http://localhost:8080/api/admin/companies", { params: params })
    }

    deleteCompany(id: number, token: string) {
        let params = new HttpParams()
            .set("token", token)
        return this.http.delete<void>("http://localhost:8080/api/admin/companies/" + id.toString(), { params: params })
    }

    addCompany(company: Company, token: string) {
        let params = new HttpParams()
            .set("token", token)
        return this.http.post<Company>("http://localhost:8080/api/admin/companies/add", company, { params: params })
    }
}