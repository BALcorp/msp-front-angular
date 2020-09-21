import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Bookmark} from '../interfaces/bookmark';
import {Product} from '../interfaces/product';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private bookmarksUrl = 'http://localhost:8052/msp-users/rest/bookmark-api';

  constructor(private http: HttpClient) {
  }

  addBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(this.bookmarksUrl + '/private/bookmark', bookmark, this.httpOptions).pipe(
      tap((newBookmark: Bookmark) => this.log(`added bookmark with id=${newBookmark.idBookmark}`)),
      catchError(this.handleError<Bookmark>('addBookmark'))
    );
  }


  removeBookmark(bookmark: Bookmark | number): Observable<Bookmark> {
    const id = typeof bookmark === 'number' ? bookmark : bookmark.idBookmark;
    const url = `${this.bookmarksUrl + '/private/bookmark/'}/${id}`;

    return this.http.delete<Bookmark>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted bookmark id=${id}`)),
      catchError(this.handleError<Bookmark>('removeBookmark'))
    );
  }


  fetchBookmarkByProductAndUser(product: Product, user: User): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.bookmarksUrl + '/private/bookmark/' + product.idProduct + '/' + user.idUser).pipe(
      tap(_ => this.log('fetched bookmarks by Product ' + product.idProduct + ', ' + user.idUser)),
      catchError(this.handleError<Bookmark[]>('fetchBookmarkByProductAndUser', []))
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
