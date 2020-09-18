/**
 * 合并类名
 * @arguments { ...rest: Array<string | undefined | null> } 类名,将传入的类名
 */
const classJoin = (...rest: Array<string | undefined | null>) => rest.filter((className) => className).join(' ')
export default classJoin