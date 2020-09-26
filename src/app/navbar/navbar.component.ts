import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../services/authorization.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _auth: AuthorizationService, private _router: Router) {
  }

  doLogout() {
    this._auth.logOut();
    this._router.navigateByUrl('/welcome');
  }

  ngOnInit(): void {
  }

}
