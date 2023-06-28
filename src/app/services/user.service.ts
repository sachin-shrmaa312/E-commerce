import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { login, signup } from 'src/data.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLogin = new BehaviorSubject<boolean>(false);

  loginError=new EventEmitter<boolean>(false)



  constructor(private http: HttpClient, private route:Router) { }
  
  signUp(data: any) {
    return this.http.post(`http://localhost:3000/userLogin`, data, {
      observe: 'response'
    }).subscribe((res) => {
      console.log(res)
      this.userLogin.next(true);
      localStorage.setItem('userLogin', JSON.stringify(res.body))
      this.route.navigate(['']);
      
      
      })
  }

  login(user: any) {
    return this.http.get(`http://localhost:3000/userLogin?email=${user.email}&password=${user.password}`,
      { observe: 'response' }).subscribe((res:any) => {
        console.log(res);
        if (res && res.body && res.body.length) {
          console.log("user loged in")
          localStorage.setItem('userLogin', JSON.stringify(res.body[0]))
          this.route.navigate(['']);
        } else {
          console.log("login failed")
          this.loginError.emit(true)

        }
      
    })
  }

  userReload() {
    if (localStorage.getItem('userLogin')) {
      this.route.navigate(['/'])
    }
    else {
      this.userLogin.next(false)
    }
  }

}
