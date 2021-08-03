import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPubliserComponent } from './list-publiser.component';

describe('ListPubliserComponent', () => {
  let component: ListPubliserComponent;
  let fixture: ComponentFixture<ListPubliserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPubliserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPubliserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
