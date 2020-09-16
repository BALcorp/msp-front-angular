import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {Product} from '../interfaces/product';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.css']
})
export class ProductsCatalogComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;




  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }


  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

}
