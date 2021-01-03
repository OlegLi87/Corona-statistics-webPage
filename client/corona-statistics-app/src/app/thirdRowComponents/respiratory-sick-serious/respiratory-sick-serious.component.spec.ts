import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespiratorySickSeriousComponent } from './respiratory-sick-serious.component';

describe('RespiratorySickSeriousComponent', () => {
  let component: RespiratorySickSeriousComponent;
  let fixture: ComponentFixture<RespiratorySickSeriousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespiratorySickSeriousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespiratorySickSeriousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
