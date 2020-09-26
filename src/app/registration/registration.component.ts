import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from '../services/authorization.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  username: string;
  email: string;
  password: string;

  registerSuccess = false;
  error = '';

  constructor(private auth: AuthorizationService, private _router: Router) {
  }

  register() {

    this.auth.register(this.username, this.password, this.email).subscribe(
      (data) => {
        this.registerSuccess = true;
        this.username = null;
        this.password = null;
        this.email = null;
      },
      (err) => {
        console.log(err);
        this.error = 'Registration Error has occured';
      }
    );
  }

  ngOnInit(): void {
  }

}
