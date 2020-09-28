import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../services/authorization.service';
import {CognitoUser, CognitoUserAttribute} from 'amazon-cognito-identity-js';

@Component({
  selector: 'app-my-perso-account-client',
  templateUrl: './my-perso-account-client.component.html',
  styleUrls: ['./my-perso-account-client.component.css']
})
export class MyPersoAccountClientComponent implements OnInit {

  page: string;
  currentUser: any;
  userAttributes: CognitoUserAttribute[];

  userRole: string;

  constructor(private auth: AuthorizationService) {
  }

  ngOnInit(): void {
    this.page = 'bookings';
    this.currentUser = this.auth.getAuthenticatedUser();

    this.auth.getAttr().subscribe({
      next: attributeList => {
        this.userAttributes = attributeList;
        console.log(attributeList);
        console.log(attributeList.find(attr => attr.getName() === 'custom:role').getValue());
      }
    });

    // this.userRole = this.userAttributes.find(attr => attr.getName() === 'custom:role').getValue();
    // console.log(this.userAttributes);
    // console.log('USER_ROLE : ' + this.userAttributes.find(attr => attr.getName() === 'custom:role').getValue());
  }

  displayRole() {
    console.log('USER_ROLE : ' + this.userAttributes.find(attr => attr.getName() === 'custom:role').getValue());
  }

  getRole(): string {
    return this.userAttributes.find(attr => attr.getName() === 'custom:role').getValue();
  }

}
