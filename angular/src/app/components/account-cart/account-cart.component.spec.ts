import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCartComponent } from './account-cart.component';

describe('AccountCartComponent', () => {
  let component: AccountCartComponent;
  let fixture: ComponentFixture<AccountCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
