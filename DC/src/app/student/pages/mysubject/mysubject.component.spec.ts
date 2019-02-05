import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MysubjectComponent } from './mysubject.component';

describe('MysubjectComponent', () => {
  let component: MysubjectComponent;
  let fixture: ComponentFixture<MysubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MysubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MysubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
