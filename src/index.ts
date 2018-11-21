import { Primitive, primitive as isPrimitive, object as isObject } from '@zcorky/is';

export type Source = Primitive | Array<any> | object | Function;

/**
 * deep copy
 * @param obj Primitive | Array | Object | Function
 * 
 * principle:
 *  1. as primitive, return self
 *  2. as function, return self
 *  3. as array/object, enumerate it, then do 1, 2, 3
 */
export const deepCopy = (obj: Source) => {
  if (isPrimitive(obj)) return obj;

  if (typeof obj === 'function') return obj;

  const newObj = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = isObject(obj[key]) ? deepCopy(obj[key]) : obj[key];
    }
  }

  return newObj as typeof obj;
}

export default deepCopy;