import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { IDayCalendarConfig, DatePickerComponent } from 'ng2-date-picker';

import {Product} from '../interfaces/product';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: ['./simple-search.component.css']
})
export class SimpleSearchComponent implements OnInit {
  @Input() product: Product;
  @ViewChild('dateFromDp') public dateFromDp: DatePickerComponent;
  @ViewChild('dateToDp') public dateToDp: DatePickerComponent;

  public filterForm: FormGroup;
  public displayDate;


  public dayPickerConfig = {
    locale: 'fr',
    format: 'DD.MM.YYYY',
    monthFormat: 'MMMM, YYYY',
    firstDayOfWeek: 'mo'
  } as IDayCalendarConfig;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  public ngOnInit(): void {
    // When DateFrom changes we set the min selectable value for DateTo
    this.filterForm.get('dateFrom').valueChanges.subscribe(value => {
      // this.dateToDp.displayDate = value; // DateTo
      this.dayPickerConfig = {
        min: value,
        ...this.dayPickerConfig
      };
    });
  }

  private createForm(): void {
    this.filterForm = this.fb.group({
      dateFrom: new FormControl(),
      dateTo: new FormControl(),
    });
  }
}

