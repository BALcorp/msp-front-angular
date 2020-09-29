import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Product} from '../interfaces/product';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {ProductPicture} from '../interfaces/productPicture';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  setGroupFilter$ = new Subject<any>();
  getGroupFilter = this.setGroupFilter$.asObservable();
  // private productsUrl = 'http://localhost:8050/msp-product-housing/rest/product-api';
  // private orchestratorUrl = 'http://localhost:8054/msp-orchestrator/rest/orchestrator-api';

  private productsUrl = 'https://9f9rgakshg.execute-api.eu-west-3.amazonaws.com/dev/product-housing';
  private orchestratorUrl = 'http://35.180.169.139:8054/msp-orchestrator/rest/orchestrator-api';

  constructor(private http: HttpClient) {
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl + '/product').pipe(
      tap(_ => this.log('fetched products')),
      catchError(this.handleError<Product[]>('getAllProducts', []))
    );
  }

  findProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl + '/product'}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`findProduct id=${id}`))
    );
  }

  findProduct2(id: number): Observable<Product> {
    return this.getAllProducts().pipe(
      map(data => data.find(product => product.idProduct === id))
    );
  }

  findAllProductPictures(): Observable<ProductPicture[]> {
    return this.http.get<ProductPicture[]>(this.productsUrl + '/productpicture/').pipe(
      tap(_ => this.log('fetched productPictures')),
      catchError(this.handleError<ProductPicture[]>('findAllProductPictures', []))
    );
  }

  findAllProductPicturesByProductId(id: number): Observable<ProductPicture[]> {
    return this.http.get<ProductPicture[]>(this.productsUrl + '/product/' + id + '/productpicture').pipe(
      tap(_ => this.log('fetched productPictures for product id ' + id)),
      catchError(this.handleError<ProductPicture[]>('findAllProductPicturesByProductId', []))
    );
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.productsUrl + '/product', product, this.httpOptions).pipe(
      tap(_ => this.log(`updated product id=${product.idProduct}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl + '/product', product, this.httpOptions).pipe(
      tap((newProduct: Product) => this.log(`created product with id=${newProduct.idProduct}`)),
      catchError(this.handleError<Product>('createBooking'))
    );
  }

  /* TODO in API Gateway */
  multisearchProducts(checkIn: Date, checkOut: Date, guestNumber: number, zipCode: string,
                      size: number, dailyRateMin: number, dailyRateMax: number, petsAuthorized: boolean): Observable<Product[]> {
    return this.http.get<Product[]>(this.orchestratorUrl + '/public/products/' + checkIn + '/' + checkOut + '?guestNumber='
      + guestNumber + '&zipCode=' + zipCode + '&size=' + size + '&dailyRateMin=' + dailyRateMin
      + '&dailyRateMax='
      + dailyRateMax
      + '&petsAuthorized='
      + petsAuthorized).pipe(
      tap(_ => this.log('fetched products after these following multi criteria search : ' +
        '- checkin : ' + checkIn +
        'checkout : ' + checkOut +
        'guestNumber : ' + guestNumber +
        'zipCode : ' + zipCode +
        'size : ' + size +
        'dailyRateMin :' + dailyRateMin +
        'dailyRateMax : ' + dailyRateMax +
        'petsAuthorized : ' + petsAuthorized)),
      catchError(this.handleError<Product[]>('multisearchProducts', []))
    );
  }

  /* TODO in API Gateway */
  getBookmarkedProductsByUser(user: User): Observable<Product[]> {
    return this.http.get<Product[]>(this.orchestratorUrl + '/private/bookmarks?username=' + user.username).pipe(
      tap(_ => this.log('get bookmarked products of the user id : ' + user.username)),
      catchError(this.handleError<Product[]>('getBookmarkedProductsByUser', []))
    );
  }

  // fetchProducts(): Observable<any> {
  //   return this.http.get<Product[]>(this.productsUrl + '/public/product');
  // }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(s: string) {

  }
}
