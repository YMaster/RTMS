/**
 * 获取url参数
 * @param name queryName
 * @returns  返回值
 */
const getQueryString = (searchString: string = '', name: string) => {
  const searchArr = searchString.split('?')
  const i = searchArr.length - 1
  const searchStr = `?${searchArr[i]}`
  const reg = new RegExp(`${name}=[^&]*`)
  const r = reg.exec(searchStr)
  if (r !== null) {
    return unescape(decodeURI(r[0]).replace(`${name}=`, ''))
  }
  return void 0
}

export default getQueryString