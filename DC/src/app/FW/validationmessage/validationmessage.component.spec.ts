import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationmessageComponent } from './validationmessage.component';

describe('ValidationmessageComponent', () => {
  let component: ValidationmessageComponent;
  let fixture: ComponentFixture<ValidationmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
