import {
  _isString,
  _isFunction,
  _isNil,
  _isUndefined,
  _isNull,
  _isArray,
  _isObject,
  _isNumber,
} from './lodash'

export const isString = (val: any): val is string => _isString(val)
export const isFunction = (val: any): val is Function => _isFunction(val)
export const isNil = (val: any): val is undefined | null => _isNil(val)
export const isUndefined = (val: any): val is undefined => _isUndefined(val)
export const isNull = (val: any): val is null => _isNull(val)
export const isArray = <T = any>(val: any): val is Array<T> => _isArray(val)
export const isObject = (val: any): val is object => _isObject(val)
export const isNumber = (val: any): val is number => _isNumber(val)
