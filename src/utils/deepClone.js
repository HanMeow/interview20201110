/**
 * @method deepClone 複製物件
 * @param {Object} params - 要複製的物件
 * @param {Number} limit - 允許深度
 * @example deepClone(param:Object, 5)
 */
const deepClone = (() => {
  const record = [];
  let deepLimit = 5;
  const $deepClone = (
    params,
    deep = 0,
    // keys = '',
  ) => {
    // console.log('debug : $deepClone -> keys', keys);
    if (typeof params !== 'object') {
      return params;
    }
    if (record.includes(params)) {
      return '[duplicate object]';
    }
    if (deep > deepLimit) {
      return '[exceed the limit of depth]';
    }
    record.push(params);
    const items = Array.isArray(params) ? [] : {};
    Object.keys(params || {}).forEach((key) => {
      if (typeof params[key] !== 'function') {
        items[key] = $deepClone(
          params[key],
          deep + 1,
          // `${keys}/${key}`,
        );
      }
    });
    return items;
  };
  const init = (params, limit = 5) => {
    record.splice(0);
    deepLimit = Number.isNaN(+limit) ? 5 : Math.abs(+limit | 0);
    return $deepClone(params);
  };
  return init;
})();

export default deepClone;
