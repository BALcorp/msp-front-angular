import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from '../services/authorization.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  confirmCode = false;
  codeWasConfirmed = false;
  error = '';

  constructor(private auth: AuthorizationService, private _router: Router) {
  }

  register(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.auth.register(email, password).subscribe(
      (data) => {
        this.confirmCode = true;
      },
      (err) => {
        console.log(err);
        this.error = 'Registration Error has occured';
      }
    );
  }

  validateAuthCode(form: NgForm) {
    const code = form.value.code;

    this.auth.confirmAuthCode(code).subscribe(
      (data) => {
        // this._router.navigateByUrl('/');
        this.codeWasConfirmed = true;
        this.confirmCode = false;
      },
      (err) => {
        console.log(err);
        this.error = 'Confirm Authorization Error has occured';
      }
    );
  }

  ngOnInit(): void {
  }

}
