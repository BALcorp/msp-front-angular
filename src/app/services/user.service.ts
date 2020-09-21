import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../interfaces/user';
import {Credentials} from '../interfaces/credentials';
import {Role} from '../interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private orchestratorUrl = 'http://localhost:8054/msp-orchestrator/rest/orchestrator-api';
  private usersUrl = 'http://localhost:8052/msp-users/rest/user-api';
  private authUrl = 'http://localhost:8055/msp-auth/rest/auth-api';
  private connectionUrl = this.orchestratorUrl + '/public/login';
  private registerUserUrl = this.usersUrl + '/public/register';
  private registerCredentialsUrl = this.authUrl + '/public/register';
  private updateUserUrl = this.usersUrl + '/public/update';
  private updateCredentialsUrl = this.authUrl + '/public/update';

  constructor(private http: HttpClient) {
  }

  connection(username: string, password: string): Observable<User> {
    return null;
  }

  createAccount(user: User, credentials: Credentials): Observable<User> {
    user.role = Role.CLIENT;
    user.username = credentials.username;
    credentials.email = user.email;
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
