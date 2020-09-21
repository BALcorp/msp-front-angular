import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyBookingsClientComponent} from './my-bookings-client.component';

describe('MyBookingsClientComponent', () => {
  let component: MyBookingsClientComponent;
  let fixture: ComponentFixture<MyBookingsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyBookingsClientComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBookingsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
