import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../interfaces/product';
import {Evaluation} from '../interfaces/evaluation';
import {Options} from 'ng5-slider';

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
  dailyRateSliderOptions: Options = {
    floor: 110,
    ceil: 3200
  };
  sizeSliderOptions: Options = {
    floor: 9,
    ceil: 250
  };

  constructor(private productService: ProductService) {
  }

  _filterZipCode: string;

  get filterZipCode(): string {
    return this._filterZipCode;
  }

  set filterZipCode(value: string) {
    this._filterZipCode = value;
    this.filteredProducts = this.doFilter();
  }

  _filterSize = '9';

  get filterSize(): string {
    return this._filterSize;
  }

  set filterSize(value: string) {
    this._filterSize = value;
    this.filteredProducts = this.doFilter();
  }

  _filterMaxGuests = '1';

  get filterMaxGuests(): string {
    return this._filterMaxGuests;
  }

  set filterMaxGuests(value: string) {
    this._filterMaxGuests = value;
    this.filteredProducts = this.doFilter();
  }

  _filterPetsAuthorized: boolean;

  get filterPetsAuthorized(): boolean {
    return this._filterPetsAuthorized;
  }

  set filterPetsAuthorized(value: boolean) {
    this._filterPetsAuthorized = value;
    this.filteredProducts = this.doFilter();
  }

  _filterDailyRate = '3200';

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

  doFilter(): Product[] {
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
        product.property.dailyRate <= Number(this._filterDailyRate));
    }
    if (this._filterPetsAuthorized !== undefined) {
      this.filteredProducts = this.filteredProducts.filter((product: Product) =>
        product.property.petsAuthorized === this._filterPetsAuthorized);
    }
    return this.filteredProducts;
  }

  getShortDistrict(zipCode: string): string {
    switch (zipCode) {
      case '75001':
        return '- Paris 1 -';
        break;
      case '75002':
        return '- Paris 2 -';
        break;
      case '75003':
        return '- Paris 3 -';
        break;
      case '75004':
        return '- Paris 4 -';
        break;
      case '75005':
        return '- Paris 5 -';
        break;
      case '75006':
        return '- Paris 6 -';
        break;
      case '75007':
        return '- Paris 7 -';
        break;
      case '75008':
        return '- Paris 8 -';
        break;
      case '75009':
        return '- Paris 9 -';
        break;
      case '75010':
        return '- Paris 10 -';
        break;
      case '75011':
        return '- Paris 11 -';
        break;
      case '75012':
        return '- Paris 12 -';
        break;
      case '75013':
        return '- Paris 13 -';
        break;
      case '75014':
        return '- Paris 14 -';
        break;
      case '75015':
        return '- Paris 15 -';
        break;
      case '75016':
        return '- Paris 16 -';
        break;
      case '75017':
        return '- Paris 17 -';
        break;
      case '75018':
        return '- Paris 18 -';
        break;
      case '75019':
        return '- Paris 19 -';
        break;
      case '75020':
        return '- Paris 20 -';
        break;
      default:
        return '';
    }
  }
}
