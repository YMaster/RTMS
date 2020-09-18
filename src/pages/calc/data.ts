import { observable } from 'mobx'
import { routesList } from '@/modules/routes'
import { getRoutePath } from '@/api/utils'

class CalcData {
  @observable count: number = 0
  @observable.ref pathList = routesList.filter((route) => route.path !== getRoutePath())
  public increment = () => {
    this.count++
  }
  public decrement = () => {
    this.count--
  }
}

export default new CalcData()
