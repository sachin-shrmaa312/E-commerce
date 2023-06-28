import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { productType } from 'src/data.type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchRes:undefined | productType[]

  constructor(private active:ActivatedRoute, private service:ProductService){}

  ngOnInit(): void {
    let query = this.active.snapshot.paramMap.get('query');
    query && this.service.serchProducts(query).subscribe((res) => {
      this.searchRes=res
    })

  }

}
