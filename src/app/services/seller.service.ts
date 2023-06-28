import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  sellerLogin = new BehaviorSubject<boolean>(false);

  loginError =new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private route:Router) { }
  


  signup(data: any) {
    return this.http.post('http://localhost:3000/seller', data, { observe: 'response' }).subscribe((res) => {
      console.log(res)
      this.sellerLogin.next(true);
      localStorage.setItem('seller',JSON.stringify(res.body))
      this.route.navigate(['sellerHome'])
    });
  }


  sellerReload() {
    if (localStorage.getItem("seller")) {
      this.sellerLogin.next(true)
      this.route.navigate(['sellerHome'])
    }
    else{
      this.sellerLogin.next(false)
    }
  }

  userLogin(data:any) {
    return this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' }).subscribe((res: any) => {
      console.log(res)
      if (res && res.body && res.body.length) {
        console.warn("user logged in")
        localStorage.setItem('seller',JSON.stringify(res.body))
      this.route.navigate(['sellerHome'])
      } else {
        console.warn("login failed")
        this.loginError.emit(true)
      }
    })
  }


}

