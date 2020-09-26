import {ChangeDetectorRef, Component, Input, OnChanges} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../interfaces/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnChanges {
  @Input() groupFilters: Object;
  @Input() searchByKeyword: string;
  products: Product[];
  filteredProducts: Product[];
  private errorMessage: any;

  constructor(private productService: ProductService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnChanges(): void {
    if (this.groupFilters) {
      this.filterProductList(this.groupFilters, this.products);
    }
  }

  filterProductList(filters: any, products: any): void {
    this.filteredProducts = this.products;
    const keys = Object.keys(filters);
    const filterProduct = product => {
      let result = keys.map(key => {
        if (!~key.indexOf('age')) {
          if (product[key]) {
            return String(product[key]).toLowerCase().startsWith(String(filters[key]).toLowerCase());
          } else {
            return false;
          }
        }
      });
      result = result.filter(it => it !== undefined);
      if (filters['ageto'] && filters['agefrom']) {
        if (product['age']) {
          if (+product['age'] >= +filters['agefrom'] && +product['age'] <= +filters['ageto']) {
            result.push(true);
          } else {
            result.push(false);
          }
        } else {
          result.push(false);
        }
      }
      return result.reduce((acc, cur: any) => acc & cur, 1);
    };
    this.filteredProducts = this.products.filter(filterProduct);
  }

  loadProducts(): void {
    this.productService.getAllProducts()
      .subscribe({
        next: products => {
          this.products = products;
          this.filteredProducts = this.products;
        },
        error: err => this.errorMessage = err
      });

  }
}
