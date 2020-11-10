
export function digi(value:string|number):string {
  if (!value) {
    return '';
  }
  return value.length === 1 ? `0${value}` : value.toString();
}

/**
 * 千分單元加逗號
 * @param {string|number} value
 * @return {string}
 */
export function numberWithCommas(value:string|number):string {
  if (!value) {
    return '';
  }
  const parts:string[] = value.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export function priceFormat(value:string|number):string {
  return !value ? '' : `NT$ ${numberWithCommas(value)}`;
}
