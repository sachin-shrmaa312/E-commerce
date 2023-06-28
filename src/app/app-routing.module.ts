import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerEditProductComponent } from './seller-edit-product/seller-edit-product.component';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckOutComponent } from './check-out/check-out.component';

const routes: Routes = [

  {
    path: '', component: HomeComponent
  },
  {
    path: 'seller', component: SellerComponent
  },
  {
    path: 'sellerHome', component: SellerHomeComponent, canActivate: [authGuard]
  },
  {
    path: 'seller-add-product', component: SellerAddProductComponent, canActivate: [authGuard]
  },
  {
    path: 'seller-edit-product/:id', component: SellerEditProductComponent
  },
  {
    path: 'search/:query', component: SearchComponent
  },
  {
    path: 'details/:id', component: DetailsComponent
  },
  {
    path: 'user-auth', component:UserAuthComponent
  },
  {
    path:'cartPage',component:CartPageComponent
  },
  {
    path:'checkOut', component:CheckOutComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
