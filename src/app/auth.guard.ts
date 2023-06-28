import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerService } from './services/seller.service';

export @Injectable({providedIn:'root'})


class authGuard implements CanActivate {

  constructor( private service:SellerService) {
    
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // throw new Error('Method not implemented.');

    if (localStorage.getItem("seller")) {
      return true
    }
 
    return this.service.sellerLogin
  }
}
