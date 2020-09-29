import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Devise} from '../interfaces/devise';


@Injectable({
  providedIn: 'root'
})
export class ConvertorService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  // private devisesUrl = 'http://localhost:8056/devise-api';

  private devisesUrl = 'http://35.180.98.85:8056/devise-api';

  constructor(private http: HttpClient) {
  }

  convert(code: string, price: number): Observable<any> {
    return this.http.get<any>(this.devisesUrl + '/public/devise/' + code + '/' + price);

  }

  getAllCodes(): Observable<string[]> {
    return this.http.get<string[]>(this.devisesUrl + '/public/devise/codes').pipe(
      tap(_ => this.log('fetched currencies')),
      catchError(this.handleError<Devise[]>('getAllCodes', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(s: string): void{

  }
}
