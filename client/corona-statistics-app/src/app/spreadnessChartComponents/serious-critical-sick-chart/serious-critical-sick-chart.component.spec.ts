import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriousCriticalSickChartComponent } from './serious-critical-sick-chart.component';

describe('SeriousCriticalSickChartComponent', () => {
  let component: SeriousCriticalSickChartComponent;
  let fixture: ComponentFixture<SeriousCriticalSickChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeriousCriticalSickChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriousCriticalSickChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
