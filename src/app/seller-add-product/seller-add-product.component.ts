import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService} from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit{

  addProductMsg:string | undefined

  constructor(private service:ProductService){}


  ngOnInit(): void {
  }

  productForm = new FormGroup({
    productName:new FormControl(''),
    productPrice:new FormControl(''),
    productCategory:new FormControl(''),
    productColor:new FormControl(''),
    productDescription:new FormControl(''),
    productImg:new FormControl('')
  })

   submitProduct() {
    this.service.addProduct(this.productForm.value).subscribe((res) => {
      console.log(res)
      if (res) {
        this.addProductMsg= "Product is Successfully Added"
      }
      setTimeout(() => (this.addProductMsg = undefined), 2000);
    })
  }

}
