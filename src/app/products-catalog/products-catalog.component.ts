import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../interfaces/product';
import {User} from '../interfaces/user';
import {ActivatedRoute} from '@angular/router';

const NO_PRODUCT_FOUND = 'Aucune location disponible ne correspond à vos critères de recherche.';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.css']
})


export class ProductsCatalogComponent implements OnInit {

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


  products: Product[];
  clickedProduct: Product;

  constructor(private productService: ProductService) {
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

      // for (product of this.products) {
      //   product.productPictures = this.productService.findAllProductPicturesByProductId(product.idProduct);
      //
      // }
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

  replaceDotByComma(value: string): string {
    return value.replace('.', ',');
  }

  getProducts(): void {
    this.productService.getAllProducts()
      .subscribe(products => this.products = products);
  }


}
