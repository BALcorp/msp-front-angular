import {Injectable} from '@angular/core';
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';
import {Observable} from 'rxjs';


const poolData = {
  UserPoolId: 'eu-west-2_HcgY0tFjB',
  ClientId: '5or13k1n06u8ipoo0t0is6bonr'
};

const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  cognitoUser: any;
  dataRole = {
    Name: 'custom:role',
    Value: 'CLIENT',
  };

  constructor() {
  }

  register(username, password, email, lastName, firstName, phone) {
    const attributeList = [];
    const dataEmail = {
      Name: 'email',
      Value: email,
    };
    const dataLastname = {
      Name: 'family_name',
      Value: lastName,
    };
    const dataFirstname = {
      Name: 'given_name',
      Value: firstName,
    };
    const dataPhone = {
      Name: 'phone_number',
      Value: phone,
    };

    const attributeEmail = new CognitoUserAttribute(dataEmail);
    const attributeRole = new CognitoUserAttribute(this.dataRole);
    const attributeLastname = new CognitoUserAttribute(dataLastname);
    const attributeFirstname = new CognitoUserAttribute(dataFirstname);
    const attributePhone = new CognitoUserAttribute(dataPhone);

    attributeList.push(attributeEmail);
    attributeList.push(attributeLastname);
    attributeList.push(attributeFirstname);
    attributeList.push(attributeRole);
    attributeList.push(attributePhone);

    return new Observable<any>(observer => {
      userPool.signUp(username, password, attributeList, null, (err, result) => {
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

  signIn(username, password) {
    const authenticateData = {
      Username: username,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticateData);

    const userData = {
      Username: username,
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

  getAuthentificatedUser() {
    return userPool.getCurrentUser();
  }

  logOut() {
    this.getAuthentificatedUser().signOut();
    this.cognitoUser = null;
  }

}
