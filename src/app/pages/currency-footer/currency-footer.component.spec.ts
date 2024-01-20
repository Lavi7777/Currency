import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyFooterComponent } from './currency-footer.component';

describe('CurrencyFooterComponent', () => {
  let component: CurrencyFooterComponent;
  let fixture: ComponentFixture<CurrencyFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
