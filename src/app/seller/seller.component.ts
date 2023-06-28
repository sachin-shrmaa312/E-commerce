import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { login, signup } from 'src/data.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit{ 

constructor(private service:SellerService, private route:Router){}

  showLogin = false;

  authError:string = "";
  
  ngOnInit(): void {
    this.service.sellerReload()
  }


  signup = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.maxLength(30)]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    email: new FormControl('',[Validators.required,Validators.email])
  })

  login = new FormGroup({
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    email: new FormControl('',[Validators.required,Validators.email])
  })

  openLogin() {
    this.showLogin=false
  }
  openSignUp() {
    this.showLogin=true
  }

  submit() {
    this.service.signup(this.signup.value)
  }

  
  onSubmit() {
    // console.warn(data);
    this.service.userLogin(this.login.value)
    this.service.loginError.subscribe((error) => {
      if (error) {
        this.authError="Email or password is not correct"
      }
    })
    
  }


  }
