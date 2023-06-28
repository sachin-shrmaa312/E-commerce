import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { productType } from 'src/data.type';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  menuType: string='default';
  sellerName: string='';
  serchRes: undefined | productType[];
  userName: string = ''
  cartItems = 0;

  
  constructor(private route:Router, private service:ProductService){}

  ngOnInit(): void {
    
    this.route.events.subscribe((res: any) => {
      if (res.url) {
        if (localStorage.getItem('seller') && res.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore);
          this.sellerName = sellerData.name;
          this.menuType = 'seller'
        } else if (localStorage.getItem('userLogin')) {
          let userStore = localStorage.getItem('userLogin');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name
          this.menuType = 'user'
          this.service.getCartList(userData.id)
        } else {
          this.menuType = 'default'
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems=JSON.parse(cartData).length
    }

    this.service.cartData.subscribe((items) => {
      this.cartItems=items.length
    })
  
  }
  serchproduct(query:KeyboardEvent){
    if (query) {
      const element = query.target as HTMLInputElement;
      this.service.serchProducts(element.value).subscribe((res) => {
        if (res.length > 5) {
          res.length = 5;
        }
       this.serchRes=res
      })
      }
  }

  hideSearch() {
    this.serchRes=undefined
  }
  submitSearch(val:string) {
    this.route.navigate([`search/${val}`]);
  }


  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['seller']);
  }


  userLogout() {
    localStorage.removeItem('userLogin')
    this.route.navigate(['user-auth'])
    this.service.cartData.emit([]);
  }


}
