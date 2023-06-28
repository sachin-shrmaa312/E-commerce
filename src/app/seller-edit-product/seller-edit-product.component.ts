import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormControl, FormGroup } from '@angular/forms';
import { productType } from 'src/data.type';

@Component({
  selector: 'app-seller-edit-product',
  templateUrl: './seller-edit-product.component.html',
  styleUrls: ['./seller-edit-product.component.css']
})
export class SellerEditProductComponent implements OnInit {

  productData: undefined | productType;
  productMsg:undefined | string
  
  constructor(private route: ActivatedRoute, private service:ProductService , private router:Router) { }

  updateForm = new FormGroup({
    productName:new FormControl(''),
    productPrice:new FormControl(''),
    productCategory:new FormControl(''),
    productColor:new FormControl(''),
    productDescription:new FormControl(''),
    productImg: new FormControl('')
  })
  
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id')
    console.log(productId);
    productId && this.service.getProductById(productId).subscribe((res) => {
      console.log(res);
      this.productData = res;
      this.updateForm.setValue(this.productData)
    })

   
  }
  update(data: any) {

    if (this.productData) {
      data.id=this.productData.id
    }

    this.service.updateProduct(data).subscribe((res) => {
      console.log(res)
      if (res) {
        this.productMsg = "Details Updated Successfully"
      }
      
    });
    setTimeout(() => {
      this.productMsg=undefined
    }, 2500)
    this.router.navigate(['sellerHome'])
    
  }

  


}
