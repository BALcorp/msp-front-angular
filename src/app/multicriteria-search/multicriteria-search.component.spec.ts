import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MulticriteriaSearchComponent} from './multicriteria-search.component';

describe('MulticriteriaSearchComponent', () => {
  let component: MulticriteriaSearchComponent;
  let fixture: ComponentFixture<MulticriteriaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MulticriteriaSearchComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MulticriteriaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
