import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { productType } from 'src/data.type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{

  product_list: undefined | productType[];

  porductMgs: undefined | string;

  constructor(private service:ProductService){}

  ngOnInit(): void {
    this.list()
  }

  deleteItem(id:number) {
    this.service.deleteItem(id).subscribe((res) => {
      console.log(res)
      if (res) {
        this.porductMgs = "Product is deleted";
        this.list()
      }
    })
    setTimeout(() => {
      this.porductMgs = undefined
    }, 2500);
    
  }

  list() {
    this.service.products().subscribe((res) => {
      console.log(res)
      this.product_list = res;
    })
  }
 


}
