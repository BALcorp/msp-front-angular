import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../services/authorization.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lowerbar',
  templateUrl: './lowerbar.component.html',
  styleUrls: ['./lowerbar.component.css']
})
export class LowerbarComponent implements OnInit {

  constructor(public _auth: AuthorizationService, private _router: Router) {
  }

  ngOnInit(): void {
  }

}
