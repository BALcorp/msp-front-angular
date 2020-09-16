import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPersoAccountClientComponent } from './my-perso-account-client.component';

describe('MyPersoAccountClientComponent', () => {
  let component: MyPersoAccountClientComponent;
  let fixture: ComponentFixture<MyPersoAccountClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPersoAccountClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPersoAccountClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
