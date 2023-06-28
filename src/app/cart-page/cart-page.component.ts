import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSum, productType } from 'src/data.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cartData: cart[] | undefined

  priceSummry: priceSum = {
    price: 0,
    discount: 0,
    delivery: 0,
    tax:0,
    total:0
  }

  constructor(private productService:ProductService, private route:Router){}

  ngOnInit(): void {
    this.productService.currentCart().subscribe((res) => {
      this.cartData=res
      let price = 0;
      res.forEach((item) => {
        if (item.productQty) {
          price=price+ (+item.productPrice * +item.productQty)
        }
      })
      this.priceSummry.price = price;
      this.priceSummry.discount = price / 10;
      this.priceSummry.tax = price / 10;
      this.priceSummry.delivery = 60;
      this.priceSummry.total = this.priceSummry.price - this.priceSummry.discount + this.priceSummry.tax + this.priceSummry.delivery;
      console.log(this.priceSummry);
      
    })

  }



  CheckOut() {
    this.route.navigate(['checkOut'])
  }

}
