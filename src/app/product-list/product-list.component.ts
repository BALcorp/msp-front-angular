import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../interfaces/product';
import {Evaluation} from '../interfaces/evaluation';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: [`
    .star {
      position: relative;
      display: inline-block;
      font-size: 3rem;
      color: #d3d3d3;
    }

    .full {
      color: red;
    }

    .half {
      position: absolute;
      display: inline-block;
      overflow: hidden;
      color: red;
    }
  `],
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  filteredProducts: Product[];
  message: string;

  constructor(private productService: ProductService) {
  }

  private _filterZipCode: string;

  get filterZipCode(): string {
    return this._filterZipCode;
  }

  set filterZipCode(value: string) {
    this._filterZipCode = value;
    this.filteredProducts = this.doFilter();
  }

  private _filterSize: string;

  get filterSize(): string {
    return this._filterSize;
  }

  set filterSize(value: string) {
    this._filterSize = value;
    this.filteredProducts = this.doFilter();
  }

  private _filterMaxGuests: string;

  get filterMaxGuests(): string {
    return this._filterMaxGuests;
  }

  set filterMaxGuests(value: string) {
    this._filterMaxGuests = value;
    this.filteredProducts = this.doFilter();
  }

  private _filterPetsAuthorized: boolean;

  get filterPetsAuthorized(): boolean {
    return this._filterPetsAuthorized;
  }

  set filterPetsAuthorized(value: boolean) {
    this._filterPetsAuthorized = value;
    this.filteredProducts = this.doFilter();
  }

  private _filterDailyRate: string;

  get filterDailyRate(): string {
    return this._filterDailyRate;
  }

  set filterDailyRate(value: string) {
    this._filterDailyRate = value;
    this.filteredProducts = this.doFilter();
  }

  ngOnInit(): void {
    this.loadProducts();

  }

  private doFilter(): Product[] {
    this.filteredProducts = this.products;
    if (this._filterZipCode !== undefined) {
      this.filteredProducts = this.filteredProducts.filter((product: Product) =>
        product.property.zipCode.toLocaleLowerCase().lastIndexOf(this._filterZipCode) !== -1);
    }
    if (this._filterSize !== undefined) {
      this.filteredProducts = this.filteredProducts.filter((product: Product) =>
        product.property.size >= Number(this._filterSize));
    }
    if (this._filterMaxGuests !== undefined) {
      this.filteredProducts = this.filteredProducts.filter((product: Product) =>
        product.property.maxGuests >= Number(this._filterMaxGuests));
    }
    if (this._filterDailyRate !== undefined) {
      this.filteredProducts = this.filteredProducts.filter((product: Product) =>
        product.property.dailyrate <= Number(this._filterDailyRate));
    }
    if (this._filterPetsAuthorized !== undefined) {
      this.filteredProducts = this.filteredProducts.filter((product: Product) =>
        product.property.petsAuthorized === this._filterPetsAuthorized);
    }
    return this.filteredProducts;
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


  getTotalAverage(evaluations: Evaluation[]): number {
    let total = 0;
    for (const evaluation of evaluations) {
      total += (evaluation.valueForMoney + evaluation.residence + evaluation.location + evaluation.communication) / 4;
    }
    return Number((total / evaluations.length).toFixed(2));
  }


}
