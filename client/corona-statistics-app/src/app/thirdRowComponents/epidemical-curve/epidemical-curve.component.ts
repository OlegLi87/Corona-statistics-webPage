import { AfterViewInit, Component, OnInit } from '@angular/core';
import { drawArrow } from 'src/app/shared/svgUtils';

@Component({
  selector: 'app-epidemical-curve',
  templateUrl: './epidemical-curve.component.html',
  styleUrls: ['./epidemical-curve.component.css'],
})
export class EpidemicalCurveComponent implements OnInit, AfterViewInit {
  dropDownText = 'שבועיים אחרונים';

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    drawArrow('.arrow.epidemicalCurve');
  }
}
