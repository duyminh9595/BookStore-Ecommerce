import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptTokenComponent } from './accept-token.component';

describe('AcceptTokenComponent', () => {
  let component: AcceptTokenComponent;
  let fixture: ComponentFixture<AcceptTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
