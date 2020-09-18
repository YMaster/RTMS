// import { isLocalhost } from './utils'

/**
 * 每个环境对应的域名写在 HOSTS 里面
 */
interface IHosts {
  prod: string[]
  uat: string[]
  test: string[]
  dev: string[]
}
type hostType = keyof IHosts

// 接口配置对象
interface IHostConfig {
  hostType?: hostType
  [key: string]: any
}
// 重载接口配置对象
interface IHostConfig {
  login: string  // 登陆域名
  // oss: string       // oss 上传用到过
  // oa: string        // oa 连接
  // monitor: string   // 课件播放器监控系统 参数 t={token}[query]
  // localhost: string   // 本地 mock 接口
}
const hostConfig: KeyStringValueAny = {}

const setConfig = (type: hostType) => {
  switch (type) {
    case 'prod':
      hostConfig.login = 'https://api.xxx.com/xxx/login'
      break
    case 'uat':
      hostConfig.login = 'https://api-uat.xxx.com/xxx/login'
      break
    case 'test':
      hostConfig.login = 'https://api-test.xxx.com/xxx/login'
      break
    default:
      hostConfig.login = 'https://api-dev.xxx.com/xxx/login'
  }
}

const HOSTS: IHosts = {
  dev: ['api.xxx.com'],
  prod: ['api-uat.xxx.com'],
  test: ['api-test.xxx.com'],
  uat: ['api-dev.xxx.com'],
}

/**
 * @desc 根据当前域名获取当前当前环境
 * @param  host 当前域名
 * @return 当前环境
 */
const getEnvTypeByHost = (host: string): hostType | null => {
  for (const key in HOSTS) {
    if (HOSTS[key as hostType].includes(host)) {
      return key as hostType
    }
  }
  return null
}

/**
 * @desc 获取 localStorage 中的环境变量或者获取 process.env 的环境变量
 * @return 当前环境
 */
const getEnvTypeByLocalStorageOrProcess = (): hostType => {
  return (localStorage.getItem('devType') || process.env.ENV_TYPE) as hostType
}

/**
 * @desc 获取环境变量
 * @return  环境变量
 */
const getHost = (): hostType => {
  const host = window.location.host
  let env = getEnvTypeByLocalStorageOrProcess() || getEnvTypeByHost(host)
  if (!env) {
    env = 'dev'
  }
  return env
}

// 默认根据域名配置地址，可以通过 window.resetConfig 手动切换配置，用于打包后测试不同环境代码的执行结果
setConfig(getHost())

const Config = hostConfig as IHostConfig
// Config.localhost =  isLocalhost() ? 'http://localhost:3003' : ''   // 对于特殊的可以在这里追加，例如 mock 数据接口

export {
  Config,
  getHost
}

export default Config