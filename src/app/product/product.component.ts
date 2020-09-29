import {Component, OnInit} from '@angular/core';
import {Product} from '../interfaces/product';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ProductService} from '../services/product.service';
import {Booking} from '../interfaces/booking';
import {Bookmark} from '../interfaces/bookmark';
import {User} from '../interfaces/user';
import {BookmarkService} from '../services/bookmark.service';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {ProductPicture} from '../interfaces/productPicture';
import {OsmService} from '../services/osm.service';
import {Devise} from '../interfaces/devise';
import {ConvertorService} from '../services/convertor.service';
import {AuthorizationService} from '../services/authorization.service';

declare var ol: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
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

    #mapid {
      width = "100%";
      height: 500px;
    }
  `],
  providers: [NgbCarouselConfig]
})
export class ProductComponent implements OnInit {

  map: any;


  product: Product;
  booking: Booking;
  bookmark: Observable<Bookmark[]>;
  bookingCheckInDate: Date;
  bookingCheckOutDate: Date;
  petsAuthorized: string;
  user: User;
  isBookmarked = 'none';
  isNotBookmarked = 'flex';
  bookmarkService: BookmarkService;
  userService: UserService;
  imagePath = '../assets/pictures/homes_pictures/';
  devises: Observable<string[]>;
  codeDevise: string;
  convertedResult: number;
  errorMessage: string;

  images: ProductPicture[];

  constructor(private _router: Router,
              public _auth: AuthorizationService,
              private route: ActivatedRoute,
              private productService: ProductService,
              private osmService: OsmService,
              private location: Location,
              private convertorService: ConvertorService,
              config: NgbCarouselConfig) {
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
    this.getProduct();
    this.getProductPictures();
    this.getMap();
    this.devises = this.convertorService.getAllCodes();
    this.codeDevise = 'EUR';

    this.images = this.product.productPictures;


    if (this.product.property.petsAuthorized === true) {
      this.petsAuthorized = ' - Animaux autorisés';
    } else {
      this.petsAuthorized = ' - Animaux non autorisés';
    }

    try {
      this.bookmark = this.bookmarkService.fetchBookmarkByProductAndUser(this.product, this.user);
      if (null != this.bookmark) {
        this.isBookmarked = 'flex';
        this.isNotBookmarked = 'none';
      } else {
        this.isBookmarked = 'none';
        this.isNotBookmarked = 'flex';
      }
    } catch (Error) {
      this.isBookmarked = 'none';
      this.isNotBookmarked = 'none';
    }
  }

  bookProduct(): void {

    // booking.idProduct === this.product.idProduct;
    // this.booking.bookingDate === Date.now();
    // this.booking.checkInDate === this.bookingCheckInDate;
    // this.booking.checkOutDate === this.bookingCheckOutDate;
    // this.booking.pets === this.product.property.petsAuthorized;
    // this.booking.canceled === false;

    this._router.navigateByUrl('/payment');
  }

  editProduct(): string {
    return '/product-back-office';
  }

  addBookmark(): void {
    this.isBookmarked = 'flex';
    this.isNotBookmarked = 'none';
    // this.bookmark = new Bookmark(Date.now(), this.product.idProduct, this.user);
    // bookmarkService.addBookmark(this.bookmark);
  }

  removeBookmark(): void {
    this.isBookmarked = 'none';
    this.isNotBookmarked = 'flex';
    // this.bookmarkService.removeBookmark(this.bookmark);
  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.findProduct(id)
      .subscribe(product => this.product = product);
  }

  getProductPictures(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.findAllProductPicturesByProductId(id).subscribe(images => this.product.productPictures = images);
  }

  getConvertedPrice(): void {
    this.convertorService.convert(this.codeDevise, this.product.property.dailyRate).subscribe(price => this.convertedResult = price);
  }

  getMap(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.findProduct(id)
      .subscribe(
        product => {
          this.osmService.getLongLarge(product.property.address + ' ' + product.property.zipCode).subscribe(
            data => {
              console.log('=============');
              console.log(data[0].lon + ', ' + data[0].lat);
              this.map = new ol.Map({
                target: 'map',
                layers: [
                  new ol.layer.Tile({
                    source: new ol.source.OSM()
                  })
                ],
                view: new ol.View({
                  center: ol.proj.fromLonLat([parseFloat(data[0].lon), parseFloat(data[0].lat)]),
                  zoom: 18,
                })
              });
            });
        });
  }
}
