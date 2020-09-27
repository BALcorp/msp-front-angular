import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-productsearch',
  templateUrl: './productsearch.component.html',
  styleUrls: ['./productsearch.component.css']
})
export class ProductsearchComponent implements OnInit {

  searchText: string;
  filters: Object;

  constructor() {
  }

  ngOnInit(): void {
  }

}
