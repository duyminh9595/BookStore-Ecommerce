import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductsContentComponent } from './list-products-content.component';

describe('ListProductsContentComponent', () => {
  let component: ListProductsContentComponent;
  let fixture: ComponentFixture<ListProductsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductsContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
