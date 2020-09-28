import {Component, OnInit} from '@angular/core';
import {CognitoUser, CognitoUserAttribute} from 'amazon-cognito-identity-js';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-my-perso-account-client',
  templateUrl: './my-perso-account-client.component.html',
  styleUrls: ['./my-perso-account-client.component.css']
})
export class MyPersoAccountClientComponent implements OnInit {

  page: string;
  currentUser: CognitoUser;

  username: string;
  userRole: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.page = 'account';
    this.userService.loadAttributes();
    this.currentUser = this.userService.getCurrentUser();
    this.username = this.userService.getUsername();
  }

  displayRole(): string {
    return this.userService.getRole();
  }

  displayLastName(): string {
    return this.userService.getLastName();
  }

  displayFirstName(): string {
    return this.userService.getFirstName();
  }

  displayUsername(): string {
    return this.userService.getUsername();
  }

  displayEmail(): string {
    return this.userService.getEmail();
  }

  displayPhone(): string {
    return this.userService.getPhone();
  }

}
