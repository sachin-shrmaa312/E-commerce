import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { cart, login, productType } from 'src/data.type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin = false;

  authError: string = '';

  constructor(
    private service: UserService,
    private route: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // this.service.userReload()
  }

  signup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  login = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  openLogin() {
    this.showLogin = false;
  }
  openSignUp() {
    this.showLogin = true;
  }

  submitSignUp() {
    this.service.signUp(this.signup.value);
    this.route.navigate(['']);
  }

  submitLogin() {
    this.service.login(this.login.value);
    this.service.loginError.subscribe((error) => {
      if (error) {
        this.authError = 'Email or password is not correct';
      } else {
        this.localCartToRemoteCart();
      }
    });
   
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('userLogin');
    let userId = user && JSON.parse(user).id;
    setTimeout(() => {
      this.productService.getCartList(userId);
      
    }, 2000);
    if (data) {
      let cartDataList: productType[] = JSON.parse(data);
     

      cartDataList.forEach((product: productType, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.productService.addtoCart(cartData).subscribe((res) => {
            if (res) {
              console.warn('item added');
            }
          }); 
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }
    
    setTimeout(() => {
      this.productService.getCartList(userId)
    }, 2000);
  }

  
}
