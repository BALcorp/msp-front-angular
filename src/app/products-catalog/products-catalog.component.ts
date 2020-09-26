import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../interfaces/product';
import {User} from '../interfaces/user';
import {ActivatedRoute} from '@angular/router';
import {Evaluation} from '../interfaces/evaluation';

const NO_PRODUCT_FOUND = 'Aucune location disponible ne correspond à vos critères de recherche.';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
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
  styleUrls: ['./products-catalog.component.css']
})


export class ProductsCatalogComponent implements OnInit {

  filteredProducts: Product[];
  errorMessage: string;
  product: Product;

  currentRate: number;

  route: ActivatedRoute;
  message: string;
  displayProducts = 'content';
  displayMessage = 'none';
  checkIn: string;
  checkOut: string;
  guestsNumber: string;
  size: string;
  petsAuthorized: string;
  city: string;
  dailyrateMin: string;
  dailyrateMax: string;
  bookmarksUser: string;
  filterDates: string;
  filterZipCode: string;
  filterGuestsNumber: string;
  filterSize: string;
  filterDailyrates: string;
  filterPetsAuthorized: string;
  filterBookmarksUser: string;
  user: User;
  totalAverage: number;
  products: Product[];
  clickedProduct: Product;

  constructor(private productService: ProductService) {
  }

  // tslint:disable-next-line:variable-name
  _listFilter: string;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this._listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  ngOnInit(): void {
    this.getProducts();


    if (this.products == null || this.products.length === 0) {
      this.displayProducts = 'none';
      this.displayMessage = 'content';
      this.message = NO_PRODUCT_FOUND;
    } else {
      this.displayProducts = 'content';
      this.displayMessage = 'none';

    }

    this.checkIn = this.route.snapshot.paramMap.get('checkIn');
    this.checkOut = this.route.snapshot.paramMap.get('checkOut');
    this.guestsNumber = this.route.snapshot.paramMap.get('guestsNumber');
    this.city = this.route.snapshot.paramMap.get('city');

    this.size = this.route.snapshot.paramMap.get('size');
    this.dailyrateMin = this.route.snapshot.paramMap.get('dailyrateMin');
    this.dailyrateMax = this.route.snapshot.paramMap.get('dailyrateMax');
    this.petsAuthorized = this.route.snapshot.paramMap.get('petsAuthorized');

    this.bookmarksUser = this.route.snapshot.paramMap.get('bookmarksUser');

    if (null != this.checkIn && null != this.checkOut) {
      this.filterDates += '- Arrivée : ' + this.checkIn + ' - Départ : ' + this.checkOut;
    }
    if (null != this.city) {
      if (this.city === 'all') {
        this.filterZipCode += '- Dans tous les arrondissements';
      } else {
        this.city = this.city.substring(this.city.length - 2);
        if (this.city.startsWith('0')) {
          this.city = this.city.substring(this.city.length - 1);
        }
        this.filterZipCode += '- Dans le ' + this.city + 'e arrondissement';
      }
    }

    if (null != this.guestsNumber) {
      this.filterGuestsNumber += '- Pour ' + this.guestsNumber + ' personne';
      if (Number(this.guestsNumber) > 1) {
        this.filterGuestsNumber += 's';
      }
    }

    if (null != this.size) {
      this.filterSize += '- A partir de ' + this.size + ' m²';
    }
    if (null != this.dailyrateMin && null != this.dailyrateMax) {
      if (this.dailyrateMin.endsWith('.0')) {
        this.dailyrateMin = this.dailyrateMin.substring(0, this.dailyrateMin.indexOf('.'));
      }
      if (this.dailyrateMax.endsWith('.0')) {
        this.dailyrateMax = this.dailyrateMax.substring(0, this.dailyrateMax.indexOf('.'));
      }
      this.dailyrateMin = this.replaceDotByComma(this.dailyrateMin);

      this.dailyrateMax = this.replaceDotByComma(this.dailyrateMax);
      if (this.dailyrateMax === '100000') {
        this.filterDailyrates += '- A partir de ' + this.dailyrateMin + ' EUR la nuitée';
      } else {
        this.filterDailyrates += '- Entre ' + this.dailyrateMin + ' et ' + this.dailyrateMax + ' EUR la nuitée';
      }
    }

    if (null != this.petsAuthorized) {
      if (this.petsAuthorized === 'true') {
        this.petsAuthorized = '- Animaux autorisés';
      } else {
        this.petsAuthorized = '- Animaux non autorisés';
      }
      this.filterPetsAuthorized += this.petsAuthorized;
    }

    if (null != this.bookmarksUser) {
      this.filterBookmarksUser = 'Les favoris de ' + this.bookmarksUser;
    }


  }

  onSelect(product: Product): void {
    this.clickedProduct = product;
  }

  onRatingClicked(message: string): void {
    this.message = 'Product List : ' + message;
  }

  replaceDotByComma(value: string): string {
    return value.replace('.', ',');
  }

  getProducts(): void {
    this.productService.getAllProducts()
      .subscribe({
        next: products => {
          this.products = products;
          this.filteredProducts = this.products;
        },
        error: err => this.errorMessage = err
      });

  }

  performFilter(filter: string): any[] {
    // En argument je récupère le filtre inséré dans l'input text
    // je vais filtrer mon tableau products
    // et je vais garder de products que les produits dont le nom en minuscule
    // contient le caractère de mon filtre
    // return this.products.filter( (product : any ) =>
    // (<string>product.productName).toLocaleLowerCase().lastIndexOf(filter) !== -1 );
    return this.products.filter((product: Product) =>
      product.title.toLocaleLowerCase().lastIndexOf(filter) !== -1);
  }

  getTotalAverage(evaluations: Evaluation[]): number {
    let total = 0;
    for (const evaluation of evaluations) {
      total += (evaluation.valueForMoney + evaluation.residence + evaluation.location + evaluation.communication) / 4;
    }
    return Number((total / evaluations.length).toFixed(2));
  }


}
