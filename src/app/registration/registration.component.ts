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
  passwordConfirm: string;

  lastName: string;
  firstName: string;
  telephone: string;

  registerSuccess = false;
  error = '';

  constructor(private auth: AuthorizationService, private _router: Router) {
  }

  register() {

    if (this.password !== this.passwordConfirm) {
      this.password = null;
      this.passwordConfirm = null;
      alert('Mismatched passwords');
    } else {
      this.auth.register(this.username, this.password, this.email, this.lastName, this.firstName, this.telephone).subscribe(
        (data) => {
          this.registerSuccess = true;
          this.username = null;
          this.password = null;
          this.passwordConfirm = null;
          this.email = null;
          this.lastName = null;
          this.firstName = null;
          this.telephone = null;
        },
        (err) => {
          console.log(err);
          this.error = err.message;
          alert(this.error);
        }
      );
    }


  }

  ngOnInit(): void {
  }

}
