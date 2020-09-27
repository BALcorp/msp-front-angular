import {Component, OnInit} from '@angular/core';

import {Devise} from '../interfaces/devise';
import {ConvertorService} from '../services/convertor.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-convertor',
  templateUrl: './convertor.component.html',
  styleUrls: ['./convertor.component.css']
})
export class ConvertorComponent implements OnInit {

  devises: Devise[];
  errorMessage: string;
  result: Observable<any>;
  devise: Devise;
  price = 1300;

  constructor(private convertorService: ConvertorService) {
  }

  ngOnInit(): void {
    this.getDevises();
    this.result = this.convertorService.convert(this.devise.code, this.price);

  }

  getDevises(): void {
    this.convertorService.getAllDevises()
      .subscribe({
        next: devises => {
          this.devises = devises;
        },
        error: err => this.errorMessage = err
      });

  }

}
