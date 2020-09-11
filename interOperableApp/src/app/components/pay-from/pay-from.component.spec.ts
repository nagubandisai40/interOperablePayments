import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayFromComponent } from './pay-from.component';

describe('PayFromComponent', () => {
  let component: PayFromComponent;
  let fixture: ComponentFixture<PayFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
