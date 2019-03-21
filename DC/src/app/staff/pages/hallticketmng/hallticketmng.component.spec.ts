import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallticketmngComponent } from './hallticketmng.component';

describe('HallticketmngComponent', () => {
  let component: HallticketmngComponent;
  let fixture: ComponentFixture<HallticketmngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallticketmngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallticketmngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
