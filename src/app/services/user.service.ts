import {Injectable} from '@angular/core';
import {AuthorizationService} from './authorization.service';
import {CognitoUser, CognitoUserAttribute} from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // httpOptions = {
  //   headers: new HttpHeaders({'Content-Type': 'application/json'})
  // };
  // private orchestratorUrl = 'http://localhost:8054/msp-orchestrator/rest/orchestrator-api';
  // private usersUrl = 'http://localhost:8052/msp-users/rest/user-api';
  // private authUrl = 'http://localhost:8055/msp-auth/rest/auth-api';
  // private connectionUrl = this.orchestratorUrl + '/public/login';
  // private registerUserUrl = this.usersUrl + '/public/register';
  // private registerCredentialsUrl = this.authUrl + '/public/register';
  // private updateUserUrl = this.usersUrl + '/public/update';
  // private updateCredentialsUrl = this.authUrl + '/public/update';

  currentUser: any;
  userAttributes: CognitoUserAttribute[];

  constructor(private auth: AuthorizationService) {
    this.currentUser = this.auth.getAuthenticatedUser();
  }

  loadAttributes() {
    this.auth.getAttr().subscribe({
      next: attributeList => {
        this.userAttributes = attributeList;
        console.log(attributeList);
        console.log(attributeList.find(attr => attr.getName() === 'custom:role').getValue());
      }
    });
  }

  getCurrentUser(): CognitoUser {
    return this.currentUser;
  }

  getUsername(): string {
    return this.currentUser.username;
  }

  getUserAttributes(): CognitoUserAttribute[] {
    return this.userAttributes;
  }

  getEmail(): string {
    return this.userAttributes.find(attr => attr.getName() === 'email').getValue();
  }

  getRole(): string {
    return this.userAttributes.find(attr => attr.getName() === 'custom:role').getValue();
  }

  getFirstName(): string {
    return this.userAttributes.find(attr => attr.getName() === 'given_name').getValue();
  }

  getLastName(): string {
    return this.userAttributes.find(attr => attr.getName() === 'family_name').getValue();
  }

  getBirthDate(): string {
    return this.userAttributes.find(attr => attr.getName() === 'birthdate').getValue();
  }

  getPhone(): string {
    return this.userAttributes.find(attr => attr.getName() === 'phone_number').getValue();
  }

}
