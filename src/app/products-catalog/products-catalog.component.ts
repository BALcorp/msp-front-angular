import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from '../mocks/mock-products';
import {Product} from '../interfaces/product';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.css']
})
export class ProductsCatalogComponent implements OnInit {

  products = PRODUCTS;

  selectedProduct: Product;
  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
