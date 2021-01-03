import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpidemicalCurveComponent } from './epidemical-curve.component';

describe('EpidemicalCurveComponent', () => {
  let component: EpidemicalCurveComponent;
  let fixture: ComponentFixture<EpidemicalCurveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpidemicalCurveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpidemicalCurveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
