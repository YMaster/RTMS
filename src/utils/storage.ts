// tslint:disable:no-console

const sessionPrefix = 'CQM_FLM_' // 本地缓存前缀

function getStorageItem(key: string) {
  let value
  try {
    value = localStorage.getItem(`${sessionPrefix}${key}`)
  } catch (ex) {
    console.log(ex.message)
  }
  return value
}

function setStorageItem(key: string, value: string) {
  try {
    localStorage.setItem(`${sessionPrefix}${key}`, value)
  } catch (ex) {
    console.log(ex.message)
  }
}
function removeStorageItem(key: string) {
  try {
    localStorage.removeItem(`${sessionPrefix}${key}`)
  } catch (ex) {
    console.log(ex.message)
  }
}

const cachesGroupKey = (group: string, key: string) => `${group}_${key}`

class Caches {
  private caches: KeyStringValueAny = {}
  private setData = <T = any>(key: string, value: T) => {
    this.caches[key] = value
    return value
  }
  private getData = (key: string) => {
    return this.caches[key]
  }
  private delData = (key: string) => {
    delete this.caches[key]
  }
  public isLogin = (): boolean => !!this.getStorageItem('token')
  public getStorageItem = (key: string) => {
    const groupKey = cachesGroupKey('storage', key)
    if (this.caches[groupKey]) {
      return this.caches[groupKey]
    } else {
      const value = getStorageItem(key)
      this.setData(groupKey, value)
      return this.getData(groupKey)
    }
  }
  public setStorageItem = (key: string, value: string) => {
    const groupKey = cachesGroupKey('storage', key)
    setStorageItem(key, value)
    this.setData(groupKey, value)
    return value
  }
  public removeStorageItem = (key: string) => {
    const groupKey = cachesGroupKey('storage', key)
    removeStorageItem(key)
    this.delData(groupKey)
  }
  public setItem = <T = any>(key: string, value: T) => {
    this.setData(`${sessionPrefix}_${key}`, value)
    return value
  }
  public getItem = <T = any>(key: string) => {
    return this.getData(`${sessionPrefix}_${key}`) as T
  }
  public clear = () => {
    localStorage.clear()
    this.caches = {}
  }
}

const storage = new Caches()

export default storage
