import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Evaluation} from '../interfaces/evaluation';
import {catchError, tap} from 'rxjs/operators';
import {BookingWithEvaluationDetails} from '../interfaces/bookingWithEvaluationDetails';


@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  // private productsUrl = 'http://localhost:8050/msp-product-housing/rest/product-api';
  private productsUrl = 'https://9f9rgakshg.execute-api.eu-west-3.amazonaws.com/dev/product-housing';

  constructor(private http: HttpClient) {
  }

  getEvaluationFromProductAndClient(idProduct: number, username: string): Observable<Evaluation> {
    return this.http.get<Evaluation>(this.productsUrl + '/evaluation/' + idProduct + '/' + username).pipe(
      tap(_ => this.log('fetched evaluation for product ' + idProduct + ', from user ' + username)),
      catchError(this.handleError<Evaluation>('getEvaluationFromProductAndClient'))
    );
  }

  updateEvaluation(evaluation: Evaluation): Observable<any> {
    return this.http.put(this.productsUrl + '/evaluation', evaluation, this.httpOptions).pipe(
      tap(_ => this.log(`updated evaluation id=${evaluation.idEvaluation}`)),
      catchError(this.handleError<any>('updateEvaluation'))
    );
  }

  createEvaluation(bookingWithEvaluationDetails: BookingWithEvaluationDetails): Observable<BookingWithEvaluationDetails> {

    return null;
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
