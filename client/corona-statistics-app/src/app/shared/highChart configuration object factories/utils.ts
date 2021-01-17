export function getCommaFormatedString(n = 0): string {
  const resArr = [...n.toFixed()];
  if (resArr.length > 3) {
    const commaIndex = resArr.length - 3;
    resArr.splice(commaIndex, 0, ',');
  }
  return resArr.join('');
}

export function getXAxisLabelsStep(xAxisCategories: Array<any>) {
  const STEP_RATIO = 0.19;

  if (xAxisCategories.length <= 10) return 1;
  return Math.trunc(xAxisCategories.length * STEP_RATIO);
}

export const toolTipConfigObj = {
  backgroundColor: '#ffff',
  borderColor: '#ffff',
  borderRadius: 1,
  borderWidth: 10,
  hideDelay: 1,
  distance: 20,
  shadow: {
    color: 'rgba(173,173,173,0.8)',
    width: 18,
  },
  padding: 2,
  useHTML: true,
};

export const crosshairLblConfigObj = {
  enabled: true,
  borderColor: 'rgba(0,0,0,0.1)',
  borderWidth: 1,
  style: {
    fontWeight: 'bold',
    fontSize: '0.7rem',
    color: '#ffff',
    fontFamily: 'OpenSansHebrewRegular',
  },
};
