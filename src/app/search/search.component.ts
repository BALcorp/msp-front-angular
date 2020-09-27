import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  form: FormGroup;

  // zipCodes = ['75001', '75002', '75003', '75004', '75005'];
  zipCodes = [];
  zipCode: string;
  @Output() autoSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();
  searchText = '';

  constructor(private fb: FormBuilder,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    for (let i = 1; i < 10; i++) {
      this.zipCode = '7500' + i;
      this.zipCodes.push(this.zipCode);
    }
    for (let i = 10; i < 21; i++) {
      this.zipCode = '750' + i;
      this.zipCodes.push(this.zipCode);
    }
    this.zipCodes.push('Tous les arrondissements');

    this.zipCode = 'Tous les arrondissements';
    this.buildForm();
  }

  buildForm(): void {

    this.form = this.fb.group({
      size: new FormControl(''),
      maxGuests: new FormControl(''),
      zipCode: new FormControl(''),
      dailyrateMin: new FormControl(''),
      dailyrateMax: new FormControl('')

    });
  }

  search(filters: any): void {
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
    this.groupFilters.emit(filters);
  }
}
