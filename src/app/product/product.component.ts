import {Component, OnInit} from '@angular/core';
import {Product} from '../interfaces/product';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.findProduct(id)
      .subscribe(product => this.product = product);
  }

}
