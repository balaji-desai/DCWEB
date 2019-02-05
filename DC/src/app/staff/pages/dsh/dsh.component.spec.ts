import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DshComponent } from './dsh.component';

describe('DshComponent', () => {
  let component: DshComponent;
  let fixture: ComponentFixture<DshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
