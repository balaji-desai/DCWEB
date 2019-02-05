import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultycreateComponent } from './facultycreate.component';

describe('FacultycreateComponent', () => {
  let component: FacultycreateComponent;
  let fixture: ComponentFixture<FacultycreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultycreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultycreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
