import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Booking} from '../interfaces/booking';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private bookingsUrl = 'http://localhost:8051/msp-order/rest/booking-api';

  constructor(private http: HttpClient) {
  }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.bookingsUrl + '/private/bookings/', booking, this.httpOptions).pipe(
      tap((newBooking: Booking) => this.log(`added booking with id=${newBooking.idBooking}`)),
      catchError(this.handleError<Booking>('createBooking'))
    );
  }

  getBookingsByClient(user: User): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.bookingsUrl + '/private/bookings/' + user.username).pipe(
      tap(_ => this.log('fetched bookings by client ' + user.firstname + user.lastname)),
      catchError(this.handleError<Booking[]>('getBookingsByClient', []))
    );
    // return null;
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
