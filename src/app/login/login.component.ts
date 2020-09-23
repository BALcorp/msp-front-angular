import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthorizationService} from '../services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthorizationService, private _router: Router) { }

  emailVerificationMessage = false;

  onSubmit(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;

    this.auth.signIn(email, password).subscribe(
      (data) => {
        this._router.navigateByUrl('/');
      },
      (err) => {
        this.emailVerificationMessage = true;
      }
    );
  }

  ngOnInit(): void {
  }

}
