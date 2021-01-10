import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficLightProgramComponent } from './traffic-light-program.component';

describe('TrafficLightProgramComponent', () => {
  let component: TrafficLightProgramComponent;
  let fixture: ComponentFixture<TrafficLightProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrafficLightProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficLightProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
