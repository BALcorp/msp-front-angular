import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowerbarComponent } from './lowerbar.component';

describe('LowerbarComponent', () => {
  let component: LowerbarComponent;
  let fixture: ComponentFixture<LowerbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LowerbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LowerbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
