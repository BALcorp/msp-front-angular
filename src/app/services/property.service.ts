import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BedType} from '../interfaces/bedType';
import {BathroomItem} from '../interfaces/bathroomItem';
import {Amenity} from '../interfaces/amenity';
import {Property} from '../interfaces/property';
import {Bedroom} from '../interfaces/bedroom';
import {Bathroom} from '../interfaces/bathroom';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  setGroupFilter$ = new Subject<any>();
  getGroupFilter = this.setGroupFilter$.asObservable();
  private housingsUrl = 'http://localhost:8050/msp-product-housing/rest/housing-api';

  constructor(private http: HttpClient) {
  }

  getBedTypeByName(name: string): Observable<BedType> {
    return this.http.get<BedType>(this.housingsUrl + '/public/bedtype?name=' + name).pipe(
      tap(_ => this.log('fetched bedtype by name ' + name)),
      catchError(this.handleError<BedType>('getBedTypeByName'))
    );
  }

  getBathroomItemByName(name: string): Observable<BathroomItem> {
    return this.http.get<BathroomItem>(this.housingsUrl + '/public/bathroomitem?name=' + name).pipe(
      tap(_ => this.log('fetched bathroomItem by name ' + name)),
      catchError(this.handleError<BathroomItem>('getBathroomItemByName'))
    );
  }

  getAllAmenities(): Observable<Amenity[]> {
    return this.http.get<Amenity[]>(this.housingsUrl + '/public/amenity').pipe(
      tap(_ => this.log('fetched amenities')),
      catchError(this.handleError<Amenity[]>('getAllAmenities', []))
    );
  }

  getAllProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.housingsUrl + '/public/property').pipe(
      tap(_ => this.log('fetched properties')),
      catchError(this.handleError<Property[]>('getAllProperties', []))
    );
  }

  addBedroom(bedroom: Bedroom): Observable<Bedroom> {
    return this.http.post<Bedroom>(this.housingsUrl + '/public/bedroom', bedroom, this.httpOptions).pipe(
      tap((newBedroom: Bedroom) => this.log(`added bedroom with id=${newBedroom.idBedroom}`)),
      catchError(this.handleError<Bedroom>('addBedroom'))
    );
  }

  addBathroom(bathroom: Bathroom): Observable<Bathroom> {
    return this.http.post<Bathroom>(this.housingsUrl + '/public/bathroom', bathroom, this.httpOptions).pipe(
      tap((newBathroom: Bathroom) => this.log(`added bathroom with id=${newBathroom.idBathroom}`)),
      catchError(this.handleError<Bathroom>('addBathroom'))
    );
  }

  createAmenity(amenity: Amenity): Observable<Amenity> {
    return this.http.post<Amenity>(this.housingsUrl + '/public/amenity', amenity, this.httpOptions).pipe(
      tap((newAmenity: Amenity) => this.log(`added amenity with id=${newAmenity.idAmenity}`)),
      catchError(this.handleError<Amenity>('createAmenity'))
    );
  }

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
