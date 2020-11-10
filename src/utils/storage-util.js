/**
 * @version 1.0.0
 */

const EXPIRES_KEY:string = '_expiresIn';
const DEFAULT_EXPIRES = (24 * 60 * 60) * 7; // 7day

export const removeItem = (key:string):void => {
  localStorage.removeItem(key);
  localStorage.removeItem(key + EXPIRES_KEY);
};

export const getItem = (key:string):string => {
  const now:number = Date.now();
  const expiresIn:number|null = localStorage.getItem(key + EXPIRES_KEY);
  if (expiresIn === null) {
    return '';
  }
  console.log(`%cgetItem key:${key} expired:${expiresIn < now}`, 'background:#3498db;color:white');
  if (expiresIn < now) { // Expired
    removeItem(key);
    return '';
  }
  try {
    return localStorage.getItem(key) || '';
  } catch (e) {
    console.error(`getStorage: Error reading key [${key}] from localStorage: ${JSON.stringify(e)}`);
    return '';
  }
};

export const setItem = (key:string, value:string, expires:number = DEFAULT_EXPIRES):boolean => {
  console.log(`%csetItem key:${key}, expires:${expires}, value:${value}`, 'background:#3498db;color:white');

  const newExpires = Math.abs(expires); // make sure it's positive

  const now = Date.now(); // millisecs since epoch time, lets deal only with integer
  const schedule = now + (newExpires * 1000);
  try {
    localStorage.setItem(key, value);
    localStorage.setItem(key + EXPIRES_KEY, schedule);
  } catch (e) {
    console.log(`setStorage: Error setting key [${key}] in localStorage: ${JSON.stringify(e)}`);
    return false;
  }
  return true;
};
