import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainAreasplineChartComponent } from './plain-areaspline-chart.component';

describe('PlainAreasplineChartComponent', () => {
  let component: PlainAreasplineChartComponent;
  let fixture: ComponentFixture<PlainAreasplineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlainAreasplineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlainAreasplineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
