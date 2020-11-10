let queryStringObject = null;
export const queryString = ():Object => {
  if (queryStringObject) {
    return queryStringObject;
  }
  if (!window?.location?.search) {
    queryStringObject = {};
    return queryStringObject;
  }
  const search:string = window.location.search.substring(1);
  queryStringObject = JSON.parse(`{"${decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`);
  return queryStringObject;
};


export type Position = {
  top:number,
  left:number,
  height:number,
  width:number
}
/**
 * get element position relative to the document;
 * @param {HTMLElement|string} ele
 * @return {Position}
 */
export const getElementPosition = (value:HTMLElement|string):Position => {
  if (!value) {
    return null;
  }
  if (typeof value === 'string') {
    // eslint-disable-next-line
    value = document.querySelector(value);
  }
  const { body } = document;
  const rect = value.getBoundingClientRect();

  const doc = document.documentElement;

  const scrollTop = window.pageYOffset || doc.scrollTop || body.scrollTop || 0;
  const scrollLeft = window.pageXOffset || doc.scrollLeft || body.scrollLeft || 0;

  const clientTop = doc.clientTop || body.clientTop || 0;
  const clientLeft = doc.clientLeft || body.clientLeft || 0;

  const top = (rect.top + scrollTop) - clientTop;
  const left = (rect.left + scrollLeft) - clientLeft;

  return {
    top: top | 0,
    left: left | 0,
    width: rect.width,
    height: rect.height,
  };
};