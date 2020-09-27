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

  cities = ['75001', '75002', '75003', '75004', '75005'];
  @Output() autoSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();
  searchText = '';

  constructor(private fb: FormBuilder,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {

    this.form = this.fb.group({
      size: new FormControl(''),
      guestNumber: new FormControl(''),
      city: new FormControl(''),
      title: new FormControl('')

    });
  }

  search(filters: any): void {
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
    this.groupFilters.emit(filters);
  }
}
