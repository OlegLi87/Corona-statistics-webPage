declare const SVG: any;

export function drawArrow(arrowContainerClassName: string) {
  const draw = SVG().addTo(arrowContainerClassName).size('100%', '100%');

  draw.line(10.5, 12.8, 6, 9).stroke({ width: 1.9, color: '#99a4ba' });
  draw.line(10, 12.5, 14.5, 9).stroke({ width: 1.8, color: '#99a4ba' });
}
