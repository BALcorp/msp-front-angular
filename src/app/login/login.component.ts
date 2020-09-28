import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from '../services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  emailVerificationMessage = false;

  constructor(private auth: AuthorizationService, private _router: Router) {
  }

  onSubmit() {

    this.auth.signIn(this.username, this.password).subscribe(
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
