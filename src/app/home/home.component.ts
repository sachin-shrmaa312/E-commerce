import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { productType } from 'src/data.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  popularItem: undefined | productType[];
  trendy: undefined | productType[];

  ngOnInit(): void {
    this.service.popularProducts().subscribe((res) => {
      this.popularItem = res
    });


    this.service.trendyProducts().subscribe((res) => {
      this.trendy = res
    });

    
  }
  constructor(private service: ProductService) { }
  


}
