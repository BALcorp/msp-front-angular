import {ChangeDetectorRef, Component, Input, OnChanges} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../interfaces/product';
import {Evaluation} from '../interfaces/evaluation';
import {Property} from '../interfaces/property';
import {PropertyService} from '../services/property.service';

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
  message: any;
  properties: Property[];
  filteredProperties: Property[];

  constructor(private productService: ProductService, private propertyService: PropertyService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadProperties();
  }

  ngOnChanges(): void {
    if (this.groupFilters) {
      this.filterProductList(this.groupFilters, this.products);
      this.filterPropertyList(this.groupFilters, this.properties);
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

  filterPropertyList(filters: any, property: any): void {
    this.filteredProperties = this.properties;
    const keys = Object.keys(filters);
    const filterProperty = property => {
      let result = keys.map(key => {
        if (!~key.indexOf('age')) {
          if (property[key]) {
            return String(property[key]).toLowerCase().startsWith(String(filters[key]).toLowerCase());
          } else {
            return false;
          }
        }
      });
      result = result.filter(it => it !== undefined);
      if (filters['ageto'] && filters['agefrom']) {
        if (property['age']) {
          if (+property['age'] >= +filters['agefrom'] && +property['age'] <= +filters['ageto']) {
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
    this.filteredProperties = this.properties.filter(filterProperty);
  }

  loadProducts(): void {
    this.productService.getAllProducts()
      .subscribe({
        next: products => {
          this.products = products;
          this.filteredProducts = this.products;
        },
        error: err => this.message = err
      });

  }

  loadProperties(): void {
    this.propertyService.getAllProperties()
      .subscribe({
        next: properties => {
          this.properties = properties;
          this.filteredProperties = this.properties;
        },
        error: err => this.message = err
      });

  }


  getTotalAverage(evaluations: Evaluation[]): number {
    let total = 0;
    for (const evaluation of evaluations) {
      total += (evaluation.valueForMoney + evaluation.residence + evaluation.location + evaluation.communication) / 4;
    }
    return Number((total / evaluations.length).toFixed(2));
  }
}
