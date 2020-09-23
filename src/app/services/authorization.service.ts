import {Injectable} from '@angular/core';
import {AuthenticationDetails, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';
import {Observable} from 'rxjs';


const poolData = {
  UserPoolId: 'eu-west-2_kczADDxbt',
  ClientId: '483sf29arlm7k54p625puucakn'
};

const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  cognitoUser: any;

  constructor() {
  }

  register(email, password) {
    const atttibuteList = [];

    return new Observable<any>(observer => {
      userPool.signUp(email, password, atttibuteList, null, (err, result) => {
        if (err) {
          console.log(JSON.stringify(err));
          observer.error(err);
        }
        this.cognitoUser = result.user;
        console.log('signUp success', result);
        observer.next();
        observer.complete();
      });
    });
  }

  signIn(email, password) {
    const authenticateData = {
      Username: email,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticateData);

    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);

    return new Observable<any>(observer => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
          observer.next(result);
          observer.complete();
        },
        onFailure: function(err) {
          console.log(err);
          observer.error(err);
        }
      });
    });
  }

  isLoggedIn() {
    return userPool.getCurrentUser() != null;
  }

  confirmAuthCode(code) {
    const user = {
      Username: this.cognitoUser.username,
      Pool: userPool
    };
    return new Observable<any>(observer => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
          console.log(err);
          observer.error(err);
        }
        console.log('confirmAuthCode() success', result);
        observer.next();
        observer.complete();
      });
    });
  }

  getAuthentificatedUser() {
    return userPool.getCurrentUser();
  }

  logOut() {
    this.getAuthentificatedUser().signOut();
    this.cognitoUser = null;
  }

}
