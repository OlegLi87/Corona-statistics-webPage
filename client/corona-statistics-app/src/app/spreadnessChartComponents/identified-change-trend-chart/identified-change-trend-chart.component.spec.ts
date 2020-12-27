import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifiedChangeTrendChartComponent } from './identified-change-trend-chart.component';

describe('IdentifiedChangeTrendChartComponent', () => {
  let component: IdentifiedChangeTrendChartComponent;
  let fixture: ComponentFixture<IdentifiedChangeTrendChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentifiedChangeTrendChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifiedChangeTrendChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
