import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifbuilderComponent } from './notifbuilder.component';

describe('NotifbuilderComponent', () => {
  let component: NotifbuilderComponent;
  let fixture: ComponentFixture<NotifbuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifbuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifbuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
