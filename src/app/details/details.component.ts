import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, productType } from 'src/data.type';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{

  details: undefined | productType
  productQty:number=1
  removeCart = false;  
  cartData:productType | undefined


  constructor(private active: ActivatedRoute, private service:ProductService) { }

  ngOnInit(): void {
    let productId=this.active.snapshot.paramMap.get('id')
    productId && this.service.getProductById(productId).subscribe((res) => {
      this.details = res;

      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData)
        items=items.filter((item:productType)=>{productId == item.id.toString()})
        if (items.length) {
          this.removeCart=true
        }
        else {
          this.removeCart=false
        }
      } 
      let user = localStorage.getItem('userLogin');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.service.getCartList(userId);
        this.service.cartData.subscribe((res) => {
          let item = res.filter((item: productType) => productId?.toString() === item.productId?.toString());
          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true
          }
        });
      }
    
    });

  }

  haldleQuantity(val:string) {
    if (this.productQty < 20 && val === 'max') {
      this.productQty += 1
    } else if (this.productQty > 1 && val === 'min') {
      this.productQty-=1
    }
  }

  adToCart() {
    if (this.details) {
      this.details.productQty = this.productQty;
      if(!localStorage.getItem('userLogin')){
        this.service.localAddToCart(this.details)
        this.removeCart=true
      }
      else {
        let user = localStorage.getItem('userLogin');
        let userId = user && JSON.parse(user).id
        
        let cartData:cart = {
          ...this.details,
          userId,
          productId:this.details.id, 
        }
        delete cartData.id;
        this.service.addtoCart(cartData).subscribe((res) => {
          if (res) {
            this.service.getCartList(userId)
            this.removeCart=true
          }
        })
       
      }
    }
  }

  removeToCart(productId: number) {
    if (!localStorage.getItem('userLogin')) {
      this.service.localRemoveToCart(productId)
      this.removeCart = false
    }
    else {
      let user = localStorage.getItem('userLogin');
      let userId = user && JSON.parse(user).id
      console.log(this.cartData);
      this.cartData && this.service.removeToCart(this.cartData.id).subscribe((res) => {
        if (res) {
         this.service.getCartList(userId)
       }
      })
      this.removeCart = false;
      
    }
  }

}
