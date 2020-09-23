import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../interfaces/product';
import {Property} from '../interfaces/property';
import {ProductPicture} from '../interfaces/productPicture';
import {PropertyService} from '../services/property.service';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-multicriteria-search',
  templateUrl: './multicriteria-search.component.html',
  styleUrls: ['./multicriteria-search.component.css']
})
export class MulticriteriaSearchComponent implements OnInit {

  cities: string[];
  productsList: Observable<Product[]> = null;
  properties: Observable<Property[]> = null;
  productPictures: Observable<ProductPicture[]>;
  selectedProducts: Observable<Product[]> = null;
  city;
  property: Property;
  product: Product;
  productPicture: ProductPicture;
  guestsNumber: number;
  checkIn: Date;
  checkOut: Date;
  checkInLocalDate: Date;
  checkOutLocalDate: Date;
  id: number;
  resultSearch: string;
  size: number;
  dailyrateMin: number;
  dailyrateMax: number;
  petsAuthorized: boolean;
  propertyService: PropertyService;
  productService: ProductService;

  constructor() {
  }

  ngOnInit(): void {

    // this.selectedProducts = [];
    this.guestsNumber = 1;
    this.id = 0;
    this.product = null;
    this.productsList = this.productService.getAllProducts();

    for (let i = 1; i < 10; i++) {
      this.city = '7500' + i;
      this.cities.push(this.city);
    }
    for (let i = 10; i < 21; i++) {
      this.city = '750' + i;
      this.cities.push(this.city);
    }
    this.cities.push('Tous les arrondissements');

    this.city = 'Tous les arrondissements';

    this.checkIn = new Date();

    this.properties = this.propertyService.getAllProperties();
    this.productPictures = this.productService.findAllProductPicturesByProductId(this.id);
  }

  goToCatalog(): string {
    if (this.guestsNumber == null) {
      this.guestsNumber = 1;
    }
    if (this.size == null) {
      this.size = 0;
    }

    if (this.dailyrateMin == null) {
      this.dailyrateMin = 0.0;
    }

    if (this.dailyrateMax == null) {
      this.dailyrateMax = 100000.0;
    }

    if (this.city === 'Tous les arrondissements') {
      this.city = 'all';
    }

    // this.checkInLocalDate = Utils.convertToLocalDateViaInstant(checkIn);
    // if (checkOut == null) {
    //   checkOutLocalDate = checkInLocalDate.plusDays(1);
    // } else {
    //   checkOutLocalDate = Utils.convertToLocalDateViaInstant(checkOut);
    // }
    this.selectedProducts =
      this.productService.multisearchProducts(
        this.checkInLocalDate,
        this.checkOutLocalDate,
        this.guestsNumber,
        this.city,
        this.size,
        this.dailyrateMin,
        this.dailyrateMax,
        this.petsAuthorized);
    // checkInLocalDateConverted: string = checkInLocalDate.format(Utils.formatter);
    // checkOutLocalDateConverted: string checkOutLocalDate.format(Utils.formatter);

    // FacesContext facesContext = FacesContext.getCurrentInstance();
    // HttpSession session = (HttpSession) facesContext.getExternalContext().getSession(false);
    // session.setAttribute("selectedProducts", selectedProducts);
    return '/productsCatalog.html?faces-redirect=true&checkIn='
      // + checkInLocalDateConverted
      + '&checkOut='
      // + checkOutLocalDateConverted
      + '&guestsNumber='
      + this.guestsNumber
      + '&city='
      + this.city
      + '&size='
      + this.size
      + 'dailyrateMin='
      + this.dailyrateMin
      + '&dailyrateMax='
      + this.dailyrateMax
      + '&petsAuthorized='
      + this.petsAuthorized;
  }


}
