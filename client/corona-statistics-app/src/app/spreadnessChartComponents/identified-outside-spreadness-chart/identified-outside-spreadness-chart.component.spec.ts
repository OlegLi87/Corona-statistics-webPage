import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifiedOutsideSpreadnessChartComponent } from './identified-outside-spreadness-chart.component';

describe('IdentifiedOutsideSpreadnessChartComponent', () => {
  let component: IdentifiedOutsideSpreadnessChartComponent;
  let fixture: ComponentFixture<IdentifiedOutsideSpreadnessChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentifiedOutsideSpreadnessChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifiedOutsideSpreadnessChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
