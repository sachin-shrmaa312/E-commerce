export interface signup{

    name:string,
    password:string,
    email:string
    
}

export interface login{
    email: string,
    password:string
}
export interface productType{
    productName: string,
    productPrice:string,
    productCategory: string,
    productColor: string,
    productDescription: string,
    productImg: any,
    productQty:number  | undefined,
    id: number,
    productId:undefined | number
}
export interface cart{
    productName: string,
    productPrice:string,
    productCategory: string,
    productColor: string,
    productDescription: string,
    id: number  | undefined,
    productImg: any,
    productQty:number  | undefined,
    userId :number,
    productId:number
}

export interface priceSum{
    price: number,
    discount: number,
    delivery: number,
    tax:number,
    total:number
}

export interface order{
    email: string,
    address: string,
    contact: string,
    totalPrice:number,
    userId:number
}