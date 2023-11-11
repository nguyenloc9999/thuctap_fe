import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBillComponent } from './detail-bill.component';

describe('DetailBillComponent', () => {
  let component: DetailBillComponent;
  let fixture: ComponentFixture<DetailBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailBillComponent]
    });
    fixture = TestBed.createComponent(DetailBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
