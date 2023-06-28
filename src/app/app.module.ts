import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerEditProductComponent } from './seller-edit-product/seller-edit-product.component';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckOutComponent } from './check-out/check-out.component'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    SellerComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    SellerEditProductComponent,
    SearchComponent,
    DetailsComponent,
    UserAuthComponent,
    CartPageComponent,
    CheckOutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
