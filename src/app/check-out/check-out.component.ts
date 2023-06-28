import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { cart, order, productType } from 'src/data.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

 
  totalPrice: number | undefined

  constructor(private productService: ProductService , private route:Router) { }

  ngOnInit(): void {
    this.productService.currentCart().subscribe((res) => {
      let price = 0;
      res.forEach((item) => {
        if (item.productQty) {
          price = price + (+item.productPrice * +item.productQty)
        }
      })
      this.totalPrice = price + (price / 10) + 60 - (price / 10);
      console.log(this.totalPrice);
      
    })
   
  }

  checkOutForm = new FormGroup({
    email: new FormControl(''),
    address: new FormControl(''),
    contact: new FormControl('')
  })


  orderNow() {
    console.log(this.checkOutForm.value);
    alert("Your Order is Successfully Added! Check Your order Status on Your Email")
    alert("Enjoy Ecommerce Shoping | Explore More ")
   setTimeout(() => {
    this.route.navigate([''])
   }, 2500);
  }  

}
