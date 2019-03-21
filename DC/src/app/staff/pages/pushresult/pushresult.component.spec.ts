import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PushresultComponent } from './pushresult.component';

describe('PushresultComponent', () => {
  let component: PushresultComponent;
  let fixture: ComponentFixture<PushresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
