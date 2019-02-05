import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormacceptanceComponent } from './formacceptance.component';

describe('FormacceptanceComponent', () => {
  let component: FormacceptanceComponent;
  let fixture: ComponentFixture<FormacceptanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormacceptanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormacceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
