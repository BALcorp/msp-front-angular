import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductBackOfficeComponent} from './product-back-office.component';

describe('ProductBackOfficeComponent', () => {
  let component: ProductBackOfficeComponent;
  let fixture: ComponentFixture<ProductBackOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductBackOfficeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
