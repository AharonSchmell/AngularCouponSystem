export class Coupon {
    id: number
    title: string
    startDate: string
    endDate: string
    category: string
    amount: string
    description: string
    price: string
    imageURL: string

    constructor(id: number, title: string, startDate: string, endDate: string, category: string,
        amount: string, description: string, price: string, imageURL: string) {
        this.id = id
        this.title = title
        this.startDate = startDate
        this.endDate = endDate
        this.category = category
        this.amount = amount
        this.description = description
        this.price = price
        this.imageURL = imageURL
    }
}