import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../interfaces/product';

@Component({
  selector: 'app-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: ['./simple-search.component.css']
})
export class SimpleSearchComponent implements OnInit {
  @Input() product: Product;

  constructor() {
  }

  ngOnInit(): void {
  }

}
