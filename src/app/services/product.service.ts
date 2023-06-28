import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, productType } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService{

  constructor(private http: HttpClient) { }

  cartData = new EventEmitter<productType[] | []>();


  addProduct(data:any) {
    return this.http.post(`http://localhost:3000/products`, data);
  }

  products() {
    return this.http.get<productType[]>(`http://localhost:3000/products`);
  }

  deleteItem(id:number) {
  return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  getProductById(id: string) {
    return this.http.get<productType>(`http://localhost:3000/products/${id}`)
  }

  updateProduct(data:productType) {
    return this.http.put<productType>(`http://localhost:3000/products/${data.id}`,data)
  }

  popularProducts(){
    return this.http.get<productType[]>(`http://localhost:3000/products?_limit=3`);
  }

  trendyProducts(){
    return this.http.get<productType[]>(`http://localhost:3000/products?_limit=30`);
  }
  serchProducts(query:string){
    return this.http.get<productType[]>(`http://localhost:3000/products?q=${query}`);
  }

  localAddToCart(data: productType) {
    let cartData = [];
    let localCart=localStorage.getItem('localCart')
    if (!localCart) {
      localStorage.setItem('localCart',JSON.stringify([data]))
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  localRemoveToCart(productId:number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: productType[] = JSON.parse(cartData);
      items = items.filter((item:productType) =>productId!== item.id)
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addtoCart(cartDetails: cart) {
    return this.http.post(`http://localhost:3000/cart`, cartDetails);
  }

  getCartList(userId: cart) {
    return this.http.get<productType[]>(`http://localhost:3000/cart?userId=`+userId, { observe: 'response' }).subscribe((res) => {
      if (res && res.body) {
        this.cartData.emit(res.body)
    }
    })
  }

  removeToCart(cartId: number) {
    return this.http.delete(`http://localhost:3000/cart/`+cartId);
  }

  currentCart() {
    let userStore = localStorage.getItem('userLogin');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>(`http://localhost:3000/cart?=`+userData.id)
  }

}
